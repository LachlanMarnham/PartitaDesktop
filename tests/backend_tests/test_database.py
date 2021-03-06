import os
import pytest

import context  # Implicitly adds project root to python path
from backend.database.db import BaseDBConnection, SCHEMA
from backend.exceptions import DatabaseError

PATH_TO_TEST_DB = 'testDB.db'


class DBContextManager(object):
    def __init__(self, delete_after_test=True):
        self.delete_after_test = delete_after_test

    def __enter__(self):
        if os.path.exists(PATH_TO_TEST_DB):
            os.remove(PATH_TO_TEST_DB)

    def __exit__(self, exc_type, exc_val, exc_tb):
        try:
            if self.delete_after_test:
                os.remove(PATH_TO_TEST_DB)
        except FileNotFoundError:
            raise DatabaseError("DB deletion failed in post-test. {} does not exist.".format(PATH_TO_TEST_DB))


@pytest.fixture
def base_db():
    with DBContextManager():
        yield BaseDBConnection(path_to_db=PATH_TO_TEST_DB, schema=SCHEMA)


class TestBaseDB(object):
    def test_create_db(self, base_db):
        # Check DB was created
        assert os.path.exists(PATH_TO_TEST_DB), "{} was not created.".format(PATH_TO_TEST_DB)

        # Check tables were created
        base_db.execute("SELECT name FROM sqlite_master WHERE type='table';")
        table_names = {item[0] for item in base_db.fetch()}
        expected_names = SCHEMA.keys()
        assert not table_names ^ expected_names, "Incorrect tables in {}. Missing: {}. Unexpected: {}."\
            .format(PATH_TO_TEST_DB, expected_names - table_names, table_names - expected_names)

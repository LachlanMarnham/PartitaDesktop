import os
import pytest

import context
from backend.database.db import BaseDBConnection, PATH_TO_DB
from backend.exceptions import DatabaseError


class DBContextManager(object):
    def __init__(self, delete_after_test=True):
        self.delete_after_test = delete_after_test

    def __enter__(self):
        if os.path.exists(PATH_TO_DB):
            os.remove(PATH_TO_DB)

    def __exit__(self, exc_type, exc_val, exc_tb):
        try:
            if self.delete_after_test:
                os.remove(PATH_TO_DB)
        except FileNotFoundError:
            raise DatabaseError("DB deletion failed in post-test. {} does not exist.".format(PATH_TO_DB))


@pytest.fixture
def base_db():
    with DBContextManager():
        yield BaseDBConnection


class TestBaseDB(object):
   def test_create_db(self, base_db):
        assert True

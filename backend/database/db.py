import os
import sqlite3 as sql

PATH_TO_DB = 'db.db'
SCHEMA = {
    "scales": ("name text", "played_flag bool", "tempos blob"),
    "repertoire": ("name text", "played_flag bool")
}


class BaseDBConnection(object):
    def __init__(self):
        is_new_db = not os.path.exists(PATH_TO_DB)
        self._db = sql.connect(PATH_TO_DB)
        self._cursor = self._db.cursor()
        if is_new_db:
            self._create_db()

    def execute(self, *args, **kwargs):
        return self._cursor.execute(*args, **kwargs)

    def commit(self):
        self._db.commit()

    def _make_table(self, table_name, column_names):
        query_template = "MAKE TABLE ? ({})".format(','.join('?' * len(column_names)))
        query_args = (table_name,) + column_names
        self.execute(query_template, query_args)

    def _create_db(self):
        for table, columns in SCHEMA.items():
            self._make_table(table, columns)
        self.commit()


class TestDb(object):
    def __init__(self):
        self.x = 1

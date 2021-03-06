import os
import sqlite3 as sql

PATH_TO_DB = 'db.db'
SCHEMA = {
    "scales": ("name text", "played_flag bool", "tempos blob"),
    "repertoire": ("name text", "played_flag bool")
}


class BaseDBConnection(object):
    def __init__(self, path_to_db, schema):
        self._path_to_db = path_to_db
        self._schema = schema
        is_new_db = not os.path.exists(self._path_to_db)
        self._db = sql.connect(self._path_to_db)
        self._cursor = self._db.cursor()
        if is_new_db:
            self._create_db()

    def execute(self, *args, **kwargs):
        return self._cursor.execute(*args, **kwargs)

    def commit(self):
        self._db.commit()

    def _make_table(self, table_name, column_names):
        query_template = "CREATE TABLE {}" + "({})".format(','.join(['{}'] * len(column_names)))
        self.execute(query_template.format(table_name, *column_names))

    def _create_db(self):
        for table, columns in self._schema.items():
            self._make_table(table, columns)
        self.commit()

    def fetch(self, fetch_all=True):
        if fetch_all:
            data = self._fetchall()
        else:
            data = self._fetchone()
        return data

    def _fetchall(self):
        return self._cursor.fetchall()

    def _fetchone(self):
        return self._cursor.fetchone()

from sqlalchemy import (
    MetaData,
    Table,
    Column,
    Integer,
    String,
    create_engine,
    DateTime,
    Boolean,
    Text,
)
from sqlalchemy.engine.url import URL

db_config = {
    'drivername': 'sqlite',
    'database': 'test.sqlite3'
}

engine = create_engine(URL(**db_config))

metadata = MetaData()

scales_table = Table('scales', metadata,
                     Column('id', Integer, primary_key=True),
                     Column('sort_index', Integer, nullable=False),
                     Column('title', String(50), nullable=False),
                     Column('last_played', DateTime, nullable=True),
                     Column('played_since_shuffle', Boolean, nullable=False),
                     Column('tempos', Text, nullable=False)
                     )

metadata.create_all(engine)

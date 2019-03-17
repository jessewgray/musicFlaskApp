import numpy as np
import pandas as pd

import pymysql
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

engine = create_engine("mysql+pymysql://root:snowboarding@127.0.0.1:3306/musicFlask", encoding='utf-8', echo=True)
conn = engine.connect()

#print(engine.table_names())

from sqlalchemy import MetaData
from sqlalchemy import Table

# Create MetaData instance
metadata = MetaData(engine, reflect=True)
metadata.tables


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)



session = Session(engine)
#print (engine.table_names())



musicData = pd.read_sql('SELECT * from data', conn)

musicData.to_json()
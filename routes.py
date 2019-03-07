from flask import Flask, render_template, jsonify
import numpy as np
import pandas as pd
import pymysql
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import MetaData
from sqlalchemy import Table


# engine = create_engine("mysql+pymysql://root:snowboarding@127.0.0.1:3306/musicFlaskTwo", encoding='utf-8')
engine = create_engine('postgres://ljkpzfyfasxmxh:bdfb6b18ccfda15e0e09aea7d3a9e146bbecd58b3790b952675263a87064ba69@ec2-54-163-234-88.compute-1.amazonaws.com:5432/d6on3kbl97jtcf')

# conn = engine.connect()

app = Flask(__name__)
# Create MetaData instance
# metadata = MetaData(engine)
# metadata.tables


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

session = Session(engine)
#print (engine.table_names())

musicData = Base.classes.datafree

# musicData = pd.read_sql('SELECT * from data', conn)


# dataObj = []
# for i in range(len(musicData['year'])):
#     row = {
#         'year' : int(musicData.year[i]),
#         'title' : musicData.title[i],
#         'artist' : musicData.artist[i],
#         'duration' : musicData.duration[i],
#         'country' : musicData.country[i]
#     }
#     dataObj.append(row)




# mdJson = [musicData.to_json()]

#mdJson = musicData.to_json()

@app.route("/")
def index():
  return render_template("index.html")

# @app.route("/api")
# def api():

#   return jsonify(dataObj)

@app.route('/api/<country>/<artist>', methods=['GET'])
def get_data_country_artist(country, artist):

    sel=[musicData.year,
        musicData.title,
        musicData.artist,
        musicData.duration,
		musicData.country]


    results = session.query(*sel).filter(musicData.country == country).filter(musicData.artist == artist).all()

    data_all=[]
  
    for item in results:
        data = {}
        data['year'] = int(item[0])
        data['title']=item[1]
        data['artist']=item[2]
        data['duration']=item[3]
        data['country']=item[4]
        data_all.append(data)
    return jsonify(data_all)


@app.route('/api', methods=['GET'])
def get_data():

    sel=[musicData.year,
        musicData.title,
        musicData.artist,
        musicData.duration,
		musicData.country]


    results = session.query(*sel).all()

    data_all=[]
  
    for item in results:
        data = {}
        data['year'] = int(item[0])
        data['title']=item[1]
        data['artist']=item[2]
        data['duration']=item[3]
        data['country']=item[4]
        data_all.append(data)
    return jsonify(data_all)



@app.route('/api/<country>', methods=['GET'])
def get_data_country(country):
    sel=[musicData.year,
        musicData.title,
        musicData.artist,
        musicData.duration,
        musicData.country]


    results = session.query(*sel).filter(musicData.country == country).all()

    data_all=[]
  
    for item in results:
        data = {}
        data['year'] = int(item[0])
        data['title']=item[1]
        data['artist']=item[2]
        data['duration']=item[3]
        data['country']=item[4]
        data_all.append(data)
    return jsonify(data_all)




@app.route('/api/filter/<artist>', methods=['GET'])
def get_data_artist_solo(artist):
    sel=[musicData.year,
        musicData.title,
        musicData.artist,
        musicData.duration,
        musicData.country]


    results = session.query(*sel).filter(musicData.artist == artist).all()

    data_all=[]
  
    for item in results:
        data = {}
        data['year'] = int(item[0])
        data['title']=item[1]
        data['artist']=item[2]
        data['duration']=item[3]
        data['country']=item[4]
        data_all.append(data)
    return jsonify(data_all)









if __name__ == "__main__":
  app.run(debug=True)




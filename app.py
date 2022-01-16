from flask import Flask,render_template, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np

engine = create_engine("postgresql://postgres:postgres@localhost:5432/Billionaire")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Billionaires = Base.classes.silver_billionaire 
News         = Base.classes.news_article
Metric       = Base.classes.news_metric
Relationship = Base.classes.relationship

# Create our session (link) from Python to the DB
session = Session(engine)

#creating instance of flask
app = Flask(__name__)

# Route to render index.html template using data from postgres
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/info")
def info():
    return render_template("info.html")


# Route to next page
@app.route('/billionaire') 
def billionaire():

# Create our session (link) from Python to the DB
    session = Session(engine)
  
    #######################################################
    #                                                     #
    #                 Billionaire Data                    #
    #                                                     #
    #######################################################
    result = session.query(Billionaires.billionaire_id,
                            Billionaires.display_name, 
                            Billionaires.net_worth, 
                            Billionaires.country,
                            Billionaires.wealth_rank,
                            Billionaires.age,
                            Billionaires.children,
                            Billionaires.relationship_status,
                            Billionaires.is_self_made,
                            Billionaires.longitude,
                            Billionaires.latitude

    ).all()

    billionaire_data = []
    for billionaire_id, display_name, net_worth, country, wealth_rank, age, children, relationship_status, is_self_made, longitude, latitude in result:
        billionaire_dic = {}
        billionaire_dic['billionaire_id'] = billionaire_id
        billionaire_dic["display_name"] = display_name
        billionaire_dic["net_worth"] = net_worth
        billionaire_dic["county"] = country
        billionaire_dic["weath_rank"] = wealth_rank
        billionaire_dic["age"] = age
        billionaire_dic["children"] = children
        billionaire_dic["relationship_status"] = relationship_status
        billionaire_dic["is_self_made"] = is_self_made
        billionaire_dic["longitude"] = longitude
        billionaire_dic["latitude"] = latitude
        billionaire_data.append(billionaire_dic)

    #######################################################
    #                                                     #
    #                      News Data                      #
    #                                                     #
    #######################################################

    news_results = session.query(News.billionaire_id,
                                 News.publication,
                                 News.author,
                                 News.title,
                                 News.url,
                                 News.published_ts,
                                 News.popularity_rank,
    ).all()

    news_data = []
    for billionaire_id, publication, author, title, url, published_ts, popularity_rank in news_results: 
        news_dic = {}
        news_dic["billionaire_id"] = billionaire_id
        news_dic["publication"] = publication
        news_dic["author"] = author
        news_dic["title"] = title
        news_dic["url"] = url
        news_dic["published_ts"] = published_ts
        news_dic["popularity_rank"] = popularity_rank
        news_data.append(news_dic)

    #######################################################
    #                                                     #
    #                   News Metric Data                  #
    #                                                     #
    #######################################################

    metric_results = session.query(Metric.billionaire_id,
                                   Metric.total_article_count,
    ).all()

    metric_data = []
    for billionaire_id, total_article_count in metric_results:
        metric_dic = {}
        metric_dic["billionaire_id"] = billionaire_id
        metric_dic["total_article_count"] = total_article_count
        metric_data.append(metric_dic)

    #######################################################
    #                                                     #
    #                  Relationship Data                  #
    #                                                     #
    #######################################################

    relationship_results = session.query(Relationship.billionaire_id,
                                         Relationship.status
    ).all()

    relationship_data = []
    for billionaire_id, status in relationship_results:
        relationship_dic = {}
        relationship_dic["billionaire_id"] = billionaire_id
        relationship_dic["status"] = status
        relationship_data.append(relationship_dic)

    return jsonify(billionaire_data, 
                   news_data, 
                   metric_data,
                   relationship_data)

if __name__ == '__main__':
    app.run(debug=True)
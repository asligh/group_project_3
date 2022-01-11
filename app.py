from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
from flask import Flask, jsonify


engine = create_engine("postgresql://postgres:Static2$@localhost:5432/Billionaire")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Billionaires = Base.classes.silver_billionaire 
News = Base.classes.news_article

# Create our session (link) from Python to the DB
session = Session(engine)

#creating instance of flask
app = Flask(__name__)


# Route to render index.html template using data from postgres
@app.route("/")
def home():
    # Create our session (link) from Python to the DB
    session = Session(engine)
  
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

    return jsonify(billionaire_data)
    
  
    # return render_template("index.html", billionaire=billionaire)

# Route to next page
# @app.route('/billionaire') 
# def billionaire():

#     if request.method == 'POST':
#         if request.is_json:
#             data = request.get_json()
#             new = dbModel(name=data['name'], model=data['model'], doors=data['doors'])
#             db.session.add(new)
#             db.session.commit()
#             return {"message": f"billionaire {new.name} has been created successfully."}
#         else:
#             return {"error": "The request payload is not in JSON format"}

#     elif request.method == 'GET':
#         db = dbModel.query.all()
#         results = [
#             {
#                 "name": db.name,
#                 "": db.s,
#                 "": db.d
#             } for db in dbs]

#         return {"count": len(results), "billionaires": results}

if __name__ == '__main__':
    app.run(debug=True)
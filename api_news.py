from flask_sqlalchemy import SQLAlchemy
from flask import Flask

postgres=# "postgresql://{username}:{password}@localhost:5432/{dbname}"

#defineing the billionaire page
def billionaire (db.Model):

    #assign variables to the table items needed for visualizations
    __tablename__ = 'user'
    name = db.selectAll(db.type, keytype)
    location = db.column(db.type, keytype)
    networth = db.column(db.type, keytype)
    county = db.column(db.type, keytype)
    child_count = db.column(db.type, keytype)
    article_count = db.column(db.type, keytype)
    age = db.column(db.type, keytype)

    #define a dictionary (if needed)
    billionaire_data = {
        "Billionaire Name" : name,
        "Location" : location,
        "Networth" : networth,
        "Country" : county,
        "Child Count" : child_count,
        "Atricle Count" : article_count,
        "Age" : age,
    } 

    return billionaire_data



    


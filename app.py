import psycopg2
from flask import Flask, render_template


#creating instance of flask
app = Flask(__name__)
con = psycopg2.connect(database="", user="postgres", password="", host="127.0.0.1", port="5432")
cursor = con.cursor()

# use postgres to establish commection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://userid:password@server:1234/db_name'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Route to render index.html template using data from postgres
@app.route("/", methods=['post', 'get'])
def home():

    # Find one record of data from the postgres
    cursor.execute("select * from db")
    name = db.find_one()
    print(billionaire)

    # Return template and data
    
    return render_template("index.html", billionaire=billionaire)



# Route to next page
@app.route('/billionaire', methods=['POST', 'GET'])
def billionaire():

    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new = dbModel(name=data['name'], model=data['model'], doors=data['doors'])
            db.session.add(new)
            db.session.commit()
            return {"message": f"billionaire {new.name} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        db = dbModel.query.all()
        results = [
            {
                "name": db.name,
                "": db.s,
                "": db.d
            } for db in dbs]

        return {"count": len(results), "billionaires": results}
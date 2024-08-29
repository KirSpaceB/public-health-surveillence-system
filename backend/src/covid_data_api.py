from config import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE;
from sqlalchemy import create_engine;
from flask import Flask, jsonify, request;
from flask_cors import CORS;
import pandas as pd;

app = Flask(__name__);
#Enable cors for the entire app
CORS(app);

#Refactoring
  #We can turn these into separate functions by abstracting it.

# Create a connection string
connection_string = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

# Create an engine
engine = create_engine(connection_string)

# Test the connection by fetching some data
query = "SELECT * FROM `united_states_covid-19_community_levels_by_county` LIMIT 500;"

df = pd.read_sql(query, engine)

# This is how you save it to a csv 
#csv_file_path = 'covid_data.csv'  # Specify the path and name of the CSV file
#df.to_csv(csv_file_path, index=False)

@app.route('/api/covid-data', methods=['GET'])
def get_covid_data():
  #Executes query to fetch data
  df = pd.read_sql(query, engine);

  # Convert DataFrame to a list of dict
  data = df.to_dict(orient='records');

  #Iterate through each dict in the List
  result = [];
  for item in data:
    #This is not how you access value healthServiceAreaVal = data[i]['health_service_area']
    healthServiceAreaVal = item['health_service_area']
    result.append(healthServiceAreaVal);
  
  return jsonify(result)


if __name__ == '__main__':
  app.run(debug=True);
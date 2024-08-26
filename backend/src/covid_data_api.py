from config import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE
from sqlalchemy import create_engine
import pandas as pd;

# Create a connection string
connection_string = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

# Create an engine
engine = create_engine(connection_string)

# Test the connection by fetching some data
query = "SELECT * FROM `united_states_covid-19_community_levels_by_county` LIMIT 5;"

df = pd.read_sql(query, engine)

print(df)
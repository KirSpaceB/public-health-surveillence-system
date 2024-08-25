import pymysql
from sqlalchemy import create_engine
import pandas as pd;

# Connection details
host_ip = '10.255.255.254'
username = 'root'
password = 'Spooderman1$'  # replace with your MySQL root password
port = '3306'
database = 'public_health_data'  # replace with your database name

# Create a connection string
connection_string = f"mysql+pymysql://{username}:{password}@{host_ip}:{port}/{database}"

# Create an engine
engine = create_engine(connection_string)

# Test the connection by fetching some data
query = "SELECT * FROM united_states_covid-19_community_levels_by_county LIMIT 5"  # replace with your table name
df = pd.read_sql(query, engine)

print(df)
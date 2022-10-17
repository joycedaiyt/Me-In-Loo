from gcp_mysql_connection import cnxn
from connect_db import cursor

# first we setup our query
query = ("INSERT INTO space_missions (company_name, location, datum, detail, status_rocket, rocket, status_mission) "
         "VALUES (%s, %s, %s, %s, %s, %s, %s)")

# then we execute with every row in our dataframe
cursor.executemany(query, list(data.to_records(index=False)))
cnxn.commit()  # and commit changes

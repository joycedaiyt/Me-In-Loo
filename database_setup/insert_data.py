from gcp_mysql_connection import cnxn
from connect_db import cursor
import csv

# data = pd.read_csv("data.csv")

# # first we setup our query
# query = ("INSERT INTO space_mission3 (company_name, location, datum, detail, status_rocket, rocket, status_mission) "
#          "VALUES (%s, %s, %s, %s, %s, %s, %s)")


with open('data.csv', newline='',  encoding="utf8") as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        # Prepare SQL query to INSERT a record into the database.
        sql = "INSERT INTO space_missions (company_name, location, datum, detail, status_rocket, rocket, status_mission) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        print(sql)
        try:
            # Execute the SQL command
            cursor.execute(sql)
            # Commit your changes in the database
            cnxn.commit()
        except:
            # Rollback in case there is any error
            cnxn.rollback()

# # then we execute with every row in our dataframe
# cursor.executemany(query, list(data.to_records(index=False)))
# cnxn.commit()  # and commit changes

from gcp_mysql_connection import cnxn, config, mysql
import pandas as pd
import datetime
import csv

config['database'] = 'test'  # connects to the corresponding database
cnxn = mysql.connector.connect(**config)
cursor = cnxn.cursor()

# example
with open('data.csv') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        row[2] = datetime.datetime.now()
        print(row)

        # first we setup our query
        query = 'INSERT INTO space_mission3 (company_name, location, datum, detail, status_rocket, rocket, status_mission) VALUES (%s, %s, %s, %s, %s, %s, %s)'

        try:
            cursor.execute(query, row)
            cnxn.commit()
            print("success")
        except:
            cnxn.rollback()
            print("failed on")

tb_key_stats = pd.read_sql_query(
    "select * from space_mission3", con=cnxn)
print(tb_key_stats)

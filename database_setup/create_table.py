from gcp_mysql_connection import cnxn
from create_db import cursor

cursor.execute("CREATE TABLE space_missions ("
               "company_name VARCHAR(255),"
               "location VARCHAR(255),"
               "datum DATETIME,"
               "detail VARCHAR(255),"
               "status_rocket VARCHAR(255),"
               "rocket FLOAT(6,2),"
               "status_mission VARCHAR(255) )")  # create tables using sql commands

cnxn.commit()  # this commits changes to the database

from gcp_mysql_connection import cnxn, config, mysql

config['database'] = 'test'  # add new database to config dict
cnxn = mysql.connector.connect(**config)
cursor = cnxn.cursor()

# example
query = ("CREATE TABLE test4 ("
         "company_name VARCHAR(255),"
         "location VARCHAR(255),"
         "datum DATETIME,"
         "detail VARCHAR(255),"
         "status_rocket VARCHAR(255),"
         "rocket DECIMAL(6,2),"
         "status_mission VARCHAR(255) )")
try:
    cursor.execute(query)  # create tables using sql commands

    cnxn.commit()  # this commits changes to the database
    print("successfully created table")
except:
    cnxn.rollback()
    print("failed and rolledback")

cursor.execute("SHOW TABLES")
for table_name in cursor:
    print(table_name)

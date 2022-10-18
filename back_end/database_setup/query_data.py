from gcp_mysql_connection import cnxn, config, mysql

config['database'] = 'test'  # connects to the corresponding database
cnxn = mysql.connector.connect(**config)
cursor = cnxn.cursor()

# Alter sql queries below

query = "SHOW TABLES"

cursor.execute(query)
for table_name in cursor:
    print(table_name)

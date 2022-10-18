from gcp_mysql_connection import cnxn

cursor = cnxn.cursor()  # initialize connection cursor
# create a new 'test' database
cursor.execute('CREATE DATABASE test')
cnxn.close()  # close conne

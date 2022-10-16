from gcp_mysql_connection import cnxn

cursor = cnxn.cursor()  # initialize connection cursor
# create a new 'me-in-loo' database
cursor.execute('CREATE DATABASE me-in-loo')
cnxn.close()  # close conne

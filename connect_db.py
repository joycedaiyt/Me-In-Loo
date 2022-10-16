from gcp_mysql_connection import cnxn, config, mysql

config['database'] = 'me-in-loo'  # add new database to config dict
cnxn = mysql.connector.connect(**config)
cursor = cnxn.cursor()

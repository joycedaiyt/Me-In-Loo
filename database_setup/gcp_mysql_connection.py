import mysql.connector
from mysql.connector.constants import ClientFlag

config = {
    'user': 'me-in-loo',
    'password': 'uwaterloo348',
    'host': '35.193.141.203',
    'client_flags': [ClientFlag.SSL],
    'ssl_ca': 'ssl/server-ca.pem',
    'ssl_cert': 'ssl/client-cert.pem',
    'ssl_key': 'ssl/client-key.pem'
}

# now we establish our connection
cnxn = mysql.connector.connect(**config)
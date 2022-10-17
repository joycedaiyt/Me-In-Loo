import mysql.connector
from mysql.connector.constants import ClientFlag

config = {
    'user': 'me-in-loo',
    'password': 'uwaterloo348',
    'host': '35.193.141.203'
}

# now we establish our connection
cnxn = mysql.connector.connect(**config)

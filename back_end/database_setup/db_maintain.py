import csv
import mysql.connector
from gcp_sql_config import config

config['database'] = 'test'  # assign which database to connect to
cnxn = mysql.connector.connect(**config)
print("Established Connection...")
cursor = cnxn.cursor()


# create a new database with databaseName
def create_db(databaseName):
    try:
        cursor.execute('CREATE DATABASE ' + databaseName)
        print("Database " + databaseName + " successfully created!")
    except:
        cnxn.rollback()
        print("Failed to created database " + databaseName)


def create_tables(sqlPath):

    # Open SQL commands file
    fd = open(sqlPath, 'r')
    sqlFile = fd.read()
    fd.close()

    # All SQL commands
    sqlCommands = sqlFile.split(';\n\n')

    # Execute every command from the input file
    try:
        for query in sqlCommands:
            # create tables using sql commands
            cursor.execute(query)  

        cnxn.commit()
        print("successfully created tables")
    except:
        cnxn.rollback()
        print("failed and rolledback")

    # prints current tables in the database
    cursor.execute("SHOW TABLES")
    print("Current Tables:")
    for table_name in cursor:
        print(table_name)


def insert_data(sqlPath, dataPaths):
    i = 0
    fd = open(sqlPath, 'r')
    sqlFile = fd.read()
    fd.close()

    # all SQL commands
    sqlCommands = sqlFile.split(';\n\n')

    print(sqlCommands)

    # print(datetime.datetime.now())

    for query in sqlCommands:
        print(query)
        print(dataPaths[i])
        with open(dataPaths[i]) as csvfile:
            spamreader = csv.reader(csvfile)
            for row in spamreader:
                row = [None if item== 'None' else item for item in row]
                # print(row)
                try:
                    cursor.execute(query, row)
                    cnxn.commit()
                    print("SUCCESS")
                except:
                    cnxn.rollback()
                    print("FAILED...")
        i += 1
    


def other_queries(sqlPath):
    fd = open(sqlPath, 'r')
    sqlFile = fd.read()
    fd.close()

    # all SQL commands
    sqlCommands = sqlFile.split(';\n')

    try:
        for query in sqlCommands:
            cursor.execute(query)
        cnxn.commit()
        print("SUCCESS")
    except:
        cnxn.rollback()
        print("FAILED...")
    


def main():

    dataPaths = ['./datasets/user.csv',
                 './datasets/tag.csv',
                 './datasets/profile.csv',
                 './datasets/post.csv',
                 './datasets/attachedBy.csv',
                 './datasets/report.csv']

    menu = ("Which of the following commands would you like to run: \n"
            "Create Database - cd\n"
            "Create Tables - ct\n"
            "Insert Data - id\n"
            "Other Queries - oq\n"
            "Quit - q\n"
            "Note: All SQL commands should be located in the ./sql_commands folder\n")

    # create_db()
    # create_table('./sql_commands/create_tables.sql')
    while (True):
        input_var = input(menu)
        if input_var == 'cd':
            databaseName = input("Specify the new database name: ")
            create_db(databaseName)
        elif input_var == 'ct':
            create_tables('./sql_commands/create_tables.sql')
        elif input_var == 'id':
            insert_data('./sql_commands/insert_data.sql', dataPaths)
        elif input_var == 'oq':
            sqlPath = input("Specify the SQL command path of your query: ")
            other_queries(sqlPath)
        elif input_var == 'q':
            break

        print("------------------------------------------------------")

    cnxn.close()  # close conne


if __name__ == "__main__":
    main()
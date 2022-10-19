import csv
import datetime
import mysql.connector
from pathlib import Path
from gcp_sql_config import config


config['database'] = 'test'  # assign which database to connect to
cnxn = mysql.connector.connect(**config)
print("Established Connection...")
cursor = cnxn.cursor()


def create_db():
    # create a new 'test' database
    cursor.execute('CREATE DATABASE test')


def create_table(sqlPath):

    fd = open(sqlPath, 'r')
    sqlFile = fd.read()
    fd.close()

    # all SQL commands
    sqlCommands = sqlFile.split(';\n')

    # Execute every command from the input file
    try:
        for query in sqlCommands:
            cursor.execute(query)  # create tables using sql commands

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
    # create_db()
    # create_table('./sql_commands/create_tables.sql')

    dataPaths = ['./datasets/user.csv',
                 './datasets/tag.csv',
                 './datasets/profile.csv',
                 './datasets/post.csv',
                 './datasets/attachedBy.csv',
                 './datasets/report.csv']
    insert_data('./sql_commands/insert_data.sql', dataPaths)
    # other_queries('./sql_commands/drop_tables.sql')

    cnxn.close()  # close conne


if __name__ == "__main__":
    main()

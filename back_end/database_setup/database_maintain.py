import csv
import datetime
import pandas as pd
import mysql.connector
from pathlib import Path
from gcp_sql_config import config


config['database'] = 'test'  # assign which database to connect to
cnxn = mysql.connector.connect(**config)
print("Established Connection")
cursor = cnxn.cursor()


def create_db():
    # create a new 'test' database
    cursor.execute('CREATE DATABASE test')
    cnxn.close()  # close conne


def create_table(sqlPath):
    query = Path(sqlPath).read_text()

    # example
    # query = ("CREATE TABLE test4 ("
    #          "company_name VARCHAR(255),"
    #          "location VARCHAR(255),"
    #          "datum DATETIME,"
    #          "detail VARCHAR(255),"
    #          "status_rocket VARCHAR(255),"
    #          "rocket DECIMAL(6,2),"
    #          "status_mission VARCHAR(255) )")

    try:
        cursor.execute(query, multi=True)  # create tables using sql commands
        cnxn.commit()  # this commits changes to the database
        print("successfully created tables")
    except:
        cnxn.rollback()
        print("failed and rolledback")

    cursor.execute("SHOW TABLES")
    print("Current Tables:")
    for table_name in cursor:
        print(table_name)


def insert_data(sqlPath, dataPath):

    # example
    with open(dataPath) as csvfile:
        spamreader = csv.reader(csvfile)
        for row in spamreader:
            row[2] = datetime.datetime.now()
            print(row)

            query = Path(sqlPath).read_text()

            try:
                cursor.execute(query, row)
                cnxn.commit()
                print("success")
            except:
                cnxn.rollback()
                print("failed on")

    # prints the data stored in the table
    tb_key_stats = pd.read_sql_query(
        "select * from space_mission3", con=cnxn)
    print(tb_key_stats)


def other_queries(sqlPath):
    query = Path(sqlPath).read_text()

    cursor.execute(querym multi=True)
    for table_name in cursor:
        print(table_name)


def main():
    # create_db()
    # create_table('./sql_commands/create_tables.sql')
    # insert_data('./sql_commands/insert_data.sql', './datasets/data.csv')
    # other_queries('./sql_commands/drop_tables.sql)
    pass


if __name__ == "__main__":
    main()

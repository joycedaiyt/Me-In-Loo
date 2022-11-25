import csv
import mysql.connector
from gcp_sql_config import config

# assign which database to connect to
config['database'] = 'test_milestone_2_production'
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
                row = [None if item == 'None' else item for item in row]
                # print(row)
                try:
                    cursor.execute(query, row)
                    cnxn.commit()
                    print("SUCCESS")
                except:
                    cnxn.rollback()
                    print("FAILED...")
                    print(row)
                    return
        i += 1


def create_triggers(sqlPath):
    fd = open(sqlPath, 'r')
    sqlFile = fd.read()
    fd.close()

    try:
        cursor.execute("DROP TRIGGER IF EXISTS ReachedMaxReport;")
        cnxn.commit()
        cursor.execute(sqlFile)
        cnxn.commit()
        print("SUCCESS")
    except mysql.connector.Error as err:
        print(err)


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

    sample_dataPaths = ['./sample_datasets/user.csv',
                        './sample_datasets/tag.csv',
                        './sample_datasets/profile.csv',
                        './sample_datasets/post.csv',
                        './sample_datasets/attachedBy.csv',
                        './sample_datasets/report.csv']

    production_dataPaths = ['./production_datasets/user.csv',
                            './production_datasets/tag.csv',
                            './production_datasets/profile.csv',
                            './production_datasets/post.csv',
                            './production_datasets/attachedBy.csv',
                            './production_datasets/report.csv']

    menu = ("Which of the following commands would you like to run: \n"
            "Create Database - cda\n"
            "Create Tables - cta\n"
            "Create Triggers - ctr\n"
            "Insert Sample Data - isd\n"
            "Insert Production Data - ipd\n"
            "Drop tables - dta\n"
            "Other Queries - oq\n"
            "Quit - q\n"
            "Note: All SQL commands should be located in the ./sql_commands folder\n")

    # create_db()
    # create_table('./sql_commands/create_tables.sql')
    while (True):
        input_var = input(menu)
        if input_var == 'cda':
            databaseName = input("Specify the new database name: ")
            create_db(databaseName)
        elif input_var == 'cta':
            create_tables('./sql_commands/create_tables.sql')
        elif input_var == 'ctr':
            create_triggers('./sql_commands/create_triggers.sql')
        elif input_var == 'isd':
            insert_data('./sql_commands/insert_data.sql', sample_dataPaths)
        elif input_var == 'ipd':
            insert_data('./sql_commands/insert_data.sql', production_dataPaths)
        elif input_var == 'dta':
            other_queries('./sql_commands/drop_tables.sql')
        elif input_var == 'oq':
            sqlPath = input("Specify the SQL command path of your query: ")
            other_queries(sqlPath)
        elif input_var == 'q':
            break

        print("------------------------------------------------------")

    cnxn.close()  # close conne


if __name__ == "__main__":
    main()

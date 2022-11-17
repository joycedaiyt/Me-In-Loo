### Generating the Production Dataset
```
cd production_datasets
python produce_data.py
```
- This function will generate 1000 random users, profile, tags, and a random, but 1000+ numbers of posts and reports for each post. All generated data obeys the database schema

### Setting Up The Database

##### Note that SQL Workbench is required to see the schema visually (Instruction on Setting up the Workbench can be found below)

#### Using `db_maintain.py` to Manage 
The file provides `create_db()`, `create_table(sqlPath)`, `insert_data(sqlPath, dataPath)`, and `other_queries(sqlPath)` functions. \
##### Note: Set the database to your desired database at line 5 `config['database'] = 'database'`
Running the file will prompt for a menu with the functionalities below:
```
python db_maintain.py
```

#### Create Database `create_db(databaseName)`
- Create a new database XXX by changing the database name in the function to XXX
- Once a database is created, it'll appear in cloud and can be found [HERE](https://console.cloud.google.com/sql/instances/me-in-loo/databases?project=dynamic-branch-308302)


#### Create Table `create_table(sqlPath)`
- sqlPath is the path to the SQL commmands file that creates tables in the database 
- Multiple tables can be created with this function
- Specific tables are created based on ./sql_commands/create_tables.sql


#### Create Table `create_triggers(sqlPath)`
- sqlPath is the path to the SQL commmands file that creates tables in the database 
- If the trigger exists already, it will be removed and the new trigger will be created
- Specific triggers are created based on ./sql_commands/create_triggers.sql

#### Insert Sample Data `insert_data(sqlPath, dataPaths)`
- The functions takes two parameters, sqlPath as the path to the SQL commands for the insert specifications, and a list of sample dataPaths as the path to the actual data that needs to be inserted
- The dataset can be stored in a csv file, or just any file where each row corresponds to an entry, and each attribute is seperated by a comma. An example of the dataset is located in `./sample_datasets/user.csv`
##### Note: SQL commands must be in order with dataPaths
##### Note: NULL values are represented by 'None' in the datasets


#### Insert Production Data `insert_data(sqlPath, dataPaths)`
- The functions takes two parameters, sqlPath as the path to the SQL commands for the insert specifications, and a list of production dataPaths as the path to the actual data that needs to be inserted
- The dataset can be stored in a csv file, or just any file where each row corresponds to an entry, and each attribute is seperated by a comma. An example of the dataset is located in `./production_datasets/user.csv`
##### Note: SQL commands must be in order with dataPaths
##### Note: NULL values are represented by 'None' in the datasets


#### Other Queries `other_queries(sqlPath)`
- Serves as a playground to test the database with SQL commands from the sqlPath

#### Setting Up MySqlWorkbench
- Open MySqlWorkbench and add connection
- Enter in the fields `HostName`, `user`, `password` as according to the `gcp_sql_config.py` file
- Connected!

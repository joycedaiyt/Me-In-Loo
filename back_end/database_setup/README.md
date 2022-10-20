### Setting Up The Database

##### Note that SQL Workbench is required to see the schema visually and GCP does not have this functionality (Instruction on Setting up the Workbench can be found below)

#### Using `db_maintain.py` to Manage GCP MySQL
The file provides `create_db()`, `create_table(sqlPath)`, `insert_data(sqlPath, dataPath)`, and `other_queries(sqlPath)` functions. \
##### Note: Set the database to your desired database at line 5 `config['database'] = 'database'`
The functions are called from `main()`, found at the bottom of the file, and running the file is done by:
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


#### Insert Data `insert_data(sqlPath, dataPaths)`
- The functions takes two parameters, sqlPath as the path to the SQL commands for the insert specifications, and a list of dataPaths as the path to the actual data that needs to be inserted
- The dataset can be stored in a csv file, or just any file where each row corresponds to an entry, and each attribute is seperated by a comma. An example of the dataset is located in `./datasets/user.csv`
##### Note: SQL commands must be in order with dataPaths
##### Note: NULL values are represented by 'None' in the datasets


#### Other Queries `other_queries(sqlPath)`
- Serves as a playground to test the database with SQL commands from the sqlPath

#### Setting Up MySqlWorkbench
- Open MySqlWorkbench and add connection
- Enter in the fields `HostName`, `user`, `password` as according to the `gcp_sql_config.py` file
- Connected!

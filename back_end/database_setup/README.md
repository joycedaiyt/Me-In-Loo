### Setting Up The Database

##### Note that SQL Workbench is required to see the schema visually and GCP does not have this functionality

#### Using `database_maintain.py` to Manage GCP MySQL
The file provides `create_db()`, `create_table(sqlPath)`, `insert_data(sqlPath, dataPath)`, and `other_queries(sqlPath)` functions. \
The functions are called from `main()`, found at the bottom of the file, and running the file is done by:
```
python database_maintain.py
```

#### Create Database `create_db()`
- Create a new database XXX by changing the database name in the function to XXX
- Once a database is created, it'll appear in cloud and can be found [HERE](https://console.cloud.google.com/sql/instances/me-in-loo/databases?project=dynamic-branch-308302)


#### Create Table `create_table(sqlPath)`
- sqlPath is the path to the SQL commmands file that creates tables in the database. 
- Multiple tables can be created with this function
- Specific tables are created based on ./sql_commands/create_tables.sql

#### Insert Data `insert_data(sqlPath, dataPath)`
- The dataset can be stored in a csv file, or just any file where each row corresponds to an entry, and each attribute is seperated by a comma. An example of the dataset is located in data.csv in this folder
- An example to populate the data is also in `insert_data.py`
```
python3 insert_data.py
```

#### Query Data
- The file `query_data.py` serves as a playground to test the database
```
python3 query_data.py
```

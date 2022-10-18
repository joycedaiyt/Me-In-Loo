### Setting Up The Database

##### Note that SQL Workbench is required to see the schema visually and GCP does not have this functionality

#### Connect to GCP Database
```
python3 gcp_mysql_connection.py
```

#### Create Database
- Once a database is created, it'll appear in cloud and can be found [HERE](https://console.cloud.google.com/sql/instances/me-in-loo/databases?project=dynamic-branch-308302)
- To create a new database, enter the database name in `create_db.py` line 5 then run:
```
python3 create_db.py
```

#### Create Table
- Set the database used to create the table in at line 3 in `create_table.py`
- Modify the query at line 8 and run:
```
python3 create_table.py
```

#### Insert Data
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

# Me-In-Loo

### Setup Virtual Env
#### Generate requirements.txt (Does not need to be set up again)
```
pip install pipreqs
pipreqs /path/to/project --force
```
#### To setup your virtualenv (Run it in the root folder of this project):
For MacOS and Linus:
```
# https://docs.python.org/3/library/venv.html
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
\
For Windows:
```
# https://docs.python.org/3/library/venv.html
python3 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### To deactivate your virtualenv:
```python
deactivate
```
#### To reactivate your virtualenv:
```python
source venv/bin/activate
```

### Connecting to MySQL
#### Making the Connection
(Optional) The virtual environment should have mysql-connector-python installed, but if not, install the library by:
```
pip install mysql-connector-python
python3 -m pip install mysql-connector
```
- Connection configuration is located in the `gcp_sql_config.py` file. More information can be found [HERE](https://towardsdatascience.com/sql-on-the-cloud-with-python-c08a30807661)

#### Details regarding the enpoints are located in the `endpoints` folder [HERE](https://github.com/joycedaiyt/Me-In-Loo/tree/main/endpoints)

#### Interactions with the project MinIO bucket are located in the `database/minio_setup` folder [HERE](https://github.com/joycedaiyt/Me-In-Loo/tree/database/minio_setup)

#### Interactions with the MySQL database and generation of the datasets are located in the `database/database_setup` folder [HERE](https://github.com/joycedaiyt/Me-In-Loo/tree/main/database/database_setup)

### Running the Application 
Back-end, Front-end, and MinIO servers must all be running

#### Running Flask backend local server
Make sure you're in the `root directory` and run:
```
python run.py
```
The local host and port will show up in the terminal
 ```
 * Running on http://127.0.0.1:5000
 ```

#### Running Next.js frontend server
In `./front_end folder` run:
```
npm run dev
```
The app will be available
```
* Running on http://localhost:3000 by default
```

#### Running MinIO server
Make sure you have MinIO installed
in `./database/minio_setup` run:
```
minio server start
```

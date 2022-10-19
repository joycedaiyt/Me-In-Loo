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

### Connecting to GCP database
#### Set up IP Address
1. Find your IP Address
2. Go to [Google Cloud Instance](https://console.cloud.google.com/sql/instances?_ga=2.25871866.61236775.1665947265-1411528501.1662669640&_gac=1.85340651.1665947265.Cj0KCQjw166aBhDEARIsAMEyZh4mQELDcwVM3bcKHpPkkjoLNOJIkUfZA8_u45XU0PaDRMfmAu8saUoaAg8lEALw_wcB&project=dynamic-branch-308302)
3. To open the Overview page of an instance, click the instance name.
4. Select Connections from the SQL navigation menu.
5. In the Authorized networks section, click Add network and enter the IP address of the machine where the client is installed.
6. Click Done. Then click Save at the bottom of the page to save your changes.

#### Making the Connection
(Optional) The virtual environment should have mysql-connector-python installed, but if not, install the library by:
```
pip install mysql-connector-python
python3 -m pip install mysql-connector
```
- Connection configuration is located in the `gcp_sql_config.py` file. More information can be found [HERE](https://towardsdatascience.com/sql-on-the-cloud-with-python-c08a30807661)

(Optional) Connection can also be established using the following command:
```
mysql -uroot -p -h 35.193.141.203 --ssl-ca=server-ca.pem --ssl-cert=client-cert.pem --ssl-key=client-key.pem
```
- Interactions with the GCP MySQL database are located in the `back_end/database_setup` folder
- Interactions with the project GCP bucket for the GCP Storage API are located in the `back_end/gcpbucket_setup` folder

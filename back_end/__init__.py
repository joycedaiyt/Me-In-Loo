from flask import Flask
import mysql.connector
from back_end.database_setup.gcp_sql_config import config
# from flask_login import LoginManager
from flask_bootstrap import Bootstrap
from flask_cors import CORS


bootstrap = Bootstrap()

# login_manager = LoginManager()

config['database'] = 'test_mile_stone'
cnxn = mysql.connector.connect(**config)
cursor = cnxn.cursor()


def create_app():
    app = Flask(__name__)
    app.debug = True

    CORS(app)

    bootstrap.init_app(app)

    # Like the DB credentials, this should not be harcoded
    #
    # This is used by Flask for various tasks, like signing cookies
    app.config['SECRET_KEY'] = 'a super secret key'
    # login_manager.init_app(app)

    # Register the API endpoints we defined in back_end/routes.py
    from back_end.routes import routes
    app.register_blueprint(routes)
    return app

from flask import Flask
import mysql.connector
from flask_cors import CORS
from flask_bootstrap import Bootstrap
from database.database_setup.gcp_sql_config import config


bootstrap = Bootstrap()
config['database'] = "test_milestone_2_production"


def create_app():
    app = Flask("Me-In-Loo")
    app.debug = True

    CORS(app)

    bootstrap.init_app(app)

    # Like the DB credentials, this should not be harcoded
    #
    # This is used by Flask for various tasks, like signing cookies
    app.config['SECRET_KEY'] = 'a super secret key'

    # Register the API endpoints we defined in back_end/routes.py
    from endpoints.routes import routes
    app.register_blueprint(routes)
    return app

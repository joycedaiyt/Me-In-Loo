from flask import Flask, request, Response
import os
import mysql.connector
from database_setup.gcp_sql_config import config
from flask_cors import CORS

config['database'] = 'Yiran_test_1'
cnxn = mysql.connector.connect(**config)
cursor = cnxn.cursor()


def create_app():
    app = Flask(__name__)

    # @app.route('/', methods=['GET', 'POST'])
    # def handle_health_check():
    #     """Return response 200 for successful health check"""
    #     return Response(status=200)
    CORS(app)

    @app.route('/users', methods=['GET'])
    def handleLogin():
        email = request.args.get('email')
        password = request.args.get('email')
        select_stmt = "SELECT user_secret FROM User WHERE user_email = %(email)s"
        cursor.execute(select_stmt, {'email': email})
        result = cursor.fetchall()
        if (len(result) != 1):
            return Response(status=400)
        elif (result[0][0] != password):
            return Response(status=400)
        else:
            return Response("good", status=200, mimetype='application/json')

    @app.route('/users', methods=['POST'])
    def handleSignUp():
        email = request.args.get('email')
        password = request.args.get('password')
        select_stmt = "SELECT count(*) FROM User WHERE user_email = %(email)s"
        cursor.execute(select_stmt, {'email': email})
        result = cursor.fetchall()
        if (result[0][0] == 0):
            insert_stmt = "INSERT INTO User VALUES (%s, %s, %s)"
            data = (email, password, 15)
            cursor.execute(insert_stmt, data)
            cnxn.commit()
            return Response("create user success", status=200)
        else:
            return Response(status=400)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

import csv
import hashlib
import os

salt = os.urandom(32)  # Remember this
# password = 'password123'
password_list = []
email_list = []
max_post_index = 1


def produceHashKey(password):
    key = hashlib.pbkdf2_hmac(
        'sha256',  # The hash digest algorithm for HMAC
        password.encode('utf-8'),  # Convert the password to bytes
        salt,  # Provide the salt
        100000  # It is recommended to use at least 100,000 iterations of SHA-256
    )
    return key

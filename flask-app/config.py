import os
from os import environ

class Config(object):
    DEBUG = False
    TESTING = False

    basedir = os.path.abspath(os.path.dirname(__file__))

    SECRET_KEY = 'your-secret-key'

    DB_NAME = 'production-db'
    DB_USERNAME = 'root'
    DB_PASSWORD = 'password'

    UPLOADS = os.path.join(basedir, 'app/static/uploads')

    SESSION_COOKIE_SECURE = True
    DEFAULT_THEME = 'bootstrap'

class ProductionConfig(Config):
    DEBUG = True

    DB_NAME = 'production-db'
    DB_USERNAME = 'root'
    DB_PASSWORD = 'password'


    SESSION_COOKIE_SECURE = False

class DevelopmentConfig(Config):
    DEBUG = True

    DB_NAME = 'development-db'
    DB_USERNAME = 'root'
    DB_PASSWORD = 'password'

    SESSION_COOKIE_SECURE = False

class DebugConfig(Config):
    DEBUG = False

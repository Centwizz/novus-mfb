-- Creates a separate database for automated tests when the Postgres container
-- initialises. The default database (novus_dev) is created by the image itself.
CREATE DATABASE novus_test OWNER novus;

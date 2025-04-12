-- Create role to access the database
CREATE ROLE tasks WITH LOGIN PASSWORD 'pbm';

-- Create a new database
CREATE DATABASE tasks OWNER tasks;

-- Now connect to the new DB to run the rest
\c tasks

-- Optional extension
CREATE EXTENSION IF NOT EXISTS citext;

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO tasks;

-- Future tables will be accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO tasks;

GRANT tasks TO postgres;

-- Make sure any tables created are owned by tasks
SET ROLE tasks;

-- Create the tasks table
CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	title VARCHAR NOT NULL,
	description VARCHAR,
	completed BOOLEAN NOT NULL,
	priority TEXT NOT NULL,
	created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT NOW()
);
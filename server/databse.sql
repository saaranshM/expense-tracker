-- Creating the database
CREATE DATABASE expense_tracker;

-- Adding the uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creating a domain for email check
CREATE EXTENSION citext;
CREATE DOMAIN domain_email AS citext
CHECK(
   VALUE ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
);

-- Function that returns trigger to update time when record is changed
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_on = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creating the user login table
CREATE TABLE user_login (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email domain_email NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE   
);

-- Creating the user profiles table 
CREATE TABLE user_profile (
    user_id UUID PRIMARY KEY REFERENCES user_login (user_id),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    updated_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Creating trigger to update user updated_on timestamp automatically
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON user_profile
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
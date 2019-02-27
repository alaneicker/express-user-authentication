--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Users (
  id INTEGER PRIMARY KEY, 
  name VARCHAR,
  email VARCHAR,
  username VARCHAR, 
  password VARCHAR
);

INSERT INTO Users (
  name,
  email,
  username, 
  PASSWORD
) VALUES (
  'Alan Eicker',
  'alaneicker@gmail.com',
  'alaneicker',
  'bcrypt$2b$14$.5OgqP0JeLVbd/6qQ6O4S.SQyTjQkG/LSBFH3MjLR6G8mnGo1vMFG'
),
(
  'John Doe',
  'jdoe@gmail.com',
  'jdoe',
  'bcrypt$2b$14$.5OgqP0JeLVbd/6qQ6O4S.SQyTjQkG/LSBFH3MjLR6G8mnGo1vMFG'
),
(
  'Fred Nelson',
  'fnelson@yahoo.com',
  'frednelson',
  'bcrypt$2b$14$.5OgqP0JeLVbd/6qQ6O4S.SQyTjQkG/LSBFH3MjLR6G8mnGo1vMFG'
),
(
  'Mary Smith',
  'mary.smith@gmail.com',
  'msmith',
  'bcrypt$2b$14$.5OgqP0JeLVbd/6qQ6O4S.SQyTjQkG/LSBFH3MjLR6G8mnGo1vMFG'
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Users;

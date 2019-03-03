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
  password
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
),
(
  'Bob Newhart',
  'bob.newhart@gmail.com',
  'bobnewhart',
  'bcrypt$2b$14$.5OgqP0JeLVbd/6qQ6O4S.SQyTjQkG/LSBFH3MjLR6G8mnGo1vMFG'
),
(
  'Paul Monson',
  'p.mpnson@gmail.com',
  'paulmonson',
  'bcrypt$2b$14$.5OgqP0JeLVbd/6qQ6O4S.SQyTjQkG/LSBFH3MjLR6G8mnGo1vMFG'
),
(
  'John Jacoby',
  'john.jacoby@yahoo.com',
  'johnj',
  'bcrypt$2b$14$.5OgqP0JeLVbd/6qQ6O4S.SQyTjQkG/LSBFH3MjLR6G8mnGo1vMFG'
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Users;

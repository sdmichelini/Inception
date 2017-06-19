DROP DATABASE IF EXISTS idea_tracker;
CREATE DATABASE idea_tracker;

\c idea_tracker;

CREATE TABLE ideas (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(300) NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE linked_ideas (
    idea1 INTEGER references ideas(id),
    idea2 INTEGER references ideas(id),
    UNIQUE(idea1, idea2)
);

INSERT INTO ideas (title, description) 
    VALUES ('My First Idea', 'This is a description of my first idea')


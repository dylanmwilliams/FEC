DROP DATABASE IF EXISTS qanda;
CREATE DATABASE qanda;
\c qanda;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    slogan VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    default_price NUMERIC
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    body TEXT,
    date_written BIGINT,
    asker_name VARCHAR(255),
    asker_email VARCHAR(255),
    reported BOOLEAN,
    helpful INTEGER
);


CREATE INDEX idx_questions_product_id ON questions (product_id);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    body TEXT,
    date_written BIGINT,
    answerer_name VARCHAR(255),
    answerer_email VARCHAR(255),
    reported BOOLEAN,
    helpful INTEGER
);


CREATE INDEX idx_answers_question_id ON answers (question_id);

CREATE TABLE answer_photos (
    id SERIAL PRIMARY KEY,
    answer_id INTEGER REFERENCES answers(id),
    url TEXT
);


CREATE INDEX idx_answer_photos_answer_id ON answer_photos (answer_id);
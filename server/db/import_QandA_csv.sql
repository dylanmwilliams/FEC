\copy products (id, name, slogan, description, category, default_price) FROM '/Users/dylanwilliams/Desktop/CSV Data/product.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '"' ESCAPE '''';

\copy questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/dylanwilliams/Desktop/CSV Data/questions.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '"' ESCAPE '''';

\copy answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/dylanwilliams/Desktop/CSV Data/answers.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '"' ESCAPE '''';

\copy answer_photos (id, answer_id, url) FROM '/Users/dylanwilliams/Desktop/CSV Data/answers_photos.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '"' ESCAPE '''';

-- Synchronize sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers));
SELECT setval('answer_photos_id_seq', (SELECT MAX(id) FROM answer_photos));

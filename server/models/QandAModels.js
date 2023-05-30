const db = require('../db/db');

module.exports = {

  getAllQuestions: (productId, page, count) => {
    const offset = (page - 1) * count;

    const query = {
      text: `
      SELECT id, product_id, body,
        to_char(to_timestamp(date_written / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as date_written,
        asker_name, asker_email, reported, helpful
      FROM questions
        WHERE product_id = $1
      ORDER BY id
        LIMIT $2 OFFSET $3;
      `,
      values: [productId, count, offset],
    };
    return db.query(query)
      .then((res) => res.rows)
      .catch((err) => {
        console.error('Error querying database for questions', err);
        throw err;
      });
  },

  getAllAnswers: (questionId, page, count) => {
    const offset = (page - 1) * count;

    const query = {
      text: `
      SELECT
        answers.id,
        answers.question_id,
        answers.body,
        to_char(to_timestamp(answers.date_written / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as date_written,
        answers.answerer_name,
        answers.answerer_email,
        answers.reported,
        answers.helpful,
        array_agg(
          json_build_object(
            'id', answer_photos.id,
            'url', answer_photos.url
          )
        ) FILTER (WHERE answer_photos.id IS NOT NULL) as photos
      FROM answers
        LEFT JOIN answer_photos ON answers.id = answer_photos.answer_id
        WHERE question_id = $1
        GROUP BY answers.id
        ORDER BY answers.id
        LIMIT $2 OFFSET $3;
      `,
      values: [questionId, count, offset],
    };
    return db.query(query)
      .then((res) => res.rows.map((row) => {
        row.photos = row.photos ? row.photos.filter((photo) => photo !== null) : [];
        return row;
      }))
      .catch((err) => {
        console.error('Error querying db for answers', err);
        throw err;
      });
  },

  reportQuestionDB: (questionId) => {
    const query = {
      text: `
      UPDATE questions
      SET reported = true
      WHERE id = $1;
      `,
      values: [questionId],
    };

    return db.query(query)
      .then(() => {
        console.log('Question reported succcessfully');
      })
      .catch((err) => {
        console.error('Error reporting question', err);
        throw err;
      });
  },

  reportAnswerDB: (answerId) => {
    const query = {
      text: `
      UPDATE answers
      SET reported = true
      WHERE id = $1;
      `,
      values: [answerId],
    };

    return db.query(query)
      .then(() => {
        console.log('Answer reported succcessfully');
      })
      .catch((err) => {
        console.error('Error reporting answer', err);
        throw err;
      });
  },

  markQuestionDB: (questionId) => {
    const query = {
      text: `
      UPDATE questions
      SET helpful = helpful + 1
      WHERE id = $1;
      `,
      values: [questionId],
    };

    return db.query(query)
      .then(() => {
        console.log('question usccessfully marked as helpful');
      })
      .catch((err) => {
        console.error('Error marking question as helpful', err);
        throw err;
      });
  },

  markAnswerDB: (answerId) => {
    const query = {
      text: `
      UPDATE answers
      SET helpful = helpful + 1
      WHERE id = $1;
      `,
      values: [answerId],
    };

    return db.query(query)
      .then(() => {
        console.log('answer usccessfully marked as helpful');
      })
      .catch((err) => {
        console.error('Error marking answer as helpful', err);
        throw err;
      });
  },

  postQuestionDB: (questionData) => {
    const {
      question, user_name, email, product_id,
    } = questionData;

    const query = {
      text: `
    INSERT INTO questions(body, asker_name, asker_email, product_id, date_written, reported, helpful)
    VALUES ($1, $2, $3, $4, EXTRACT(EPOCH FROM NOW()) * 1000, false, 0);
    `,
      values: [question, user_name, email, product_id],
    };

    return db.query(query)
      .then(() => {
        console.log('Question successfully posted to db');
      })
      .catch((err) => {
        console.error('Error posting question to the db', err);
        throw err;
      });
  },

  postAnswerDB: (answerData) => {
    const {
      answer, user_name, email, id,
    } = answerData;

    const query = {
      text: `
      INSERT INTO answers(body, answerer_name, answerer_email, question_id, date_written,reported, helpful)
      VALUES ($1, $2, $3, $4, EXTRACT(EPOCH FROM NOW()) * 1000, false, 0);
      `,
      values: [answer, user_name, email, id],
    };

    return db.query(query)
      .then(() => {
        console.log('answer successfully posted to db');
      })
      .catch((err) => {
        console.error('Error posting answer to the db', err);
        throw err;
      });
  },
};

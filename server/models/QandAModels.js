const db = require('../db/db');

module.exports = {

  getAllQuestions: (productId, page, count) => {
    const offset = (page - 1) * count;

    const query = {
      text: `
      SELECT *
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
      SELECT *
      FROM questions
      WHERE question_id = $1
      Order BY id
      LIMIT $2 OFFSET $3;
      `,
      values: [questionId, count, offset],
    };
    return db.query(query)
      .then((res) => res.rows)
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
      question, user_name, email, id,
    } = questionData;

    const query = {
      text: `
      INSERT INTO questions(body, name, email, product_id)
      VALUES ($1, $2, $3, $4);
      `,
      values: [question, user_name, email, id],
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
      INSERT INTO answers(body, name, email, question_id)
      VALUES ($1, $2, $3, $4);
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

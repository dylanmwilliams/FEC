const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    const { id, page, count } = req.query;

    models.QandA.getAllQuestions(id, page, count)
      .then((results) => {
        console.log('Successfully sent questions from the db', { results });
        res.status(200).send({ results });
      })
      .catch((err) => {
        console.error('Error sending questions from the db', err);
        res.status(500).send();
      });
  },

  getAnswers: (req, res) => {
    const { id, page, count } = req.query;

    models.QandA.getAllAnswers(id, page, count)
      .then((results) => {
        console.log('Successfully sent answers from the db', { results });
        res.status(200).send({ results });
      })
      .catch((err) => {
        console.error('Error sending answers from the db', err);
        res.status(500).send();
      });
  },

  reportQuestion: (req, res) => {
    const { id } = req.body;

    models.QandA.reportQuestionDB(id)
      .then(() => {
        console.log('Successfully reported question');
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error reporting question', err);
      });
  },

  reportAnswer: (req, res) => {
    const { id } = req.body;

    models.QandA.reportAnswerDB(id)
      .then(() => {
        console.log('Successfully reported answer');
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error reporting answer', err);
      });
  },

  markQuestion: (req, res) => {
    const { id } = req.body;

    models.QandA.markQuestionDB(id)
      .then(() => {
        console.log('Successfully marked question as helpful');
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error marking question as helpful', err);
      });
  },

  markAnswer: (req, res) => {
    const { id } = req.body;

    models.QandA.markAnswerDB(id)
      .then(() => {
        console.log('Successfully marked answer as helpful');
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error marking answer as helpful', err);
      });
  },

  postQuestion: (req, res) => {
    models.QandA.postQuestionDB(req.body)
      .then(() => {
        console.log('Successfully posted question to db');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('Error posting question to db', err);
      });
  },

  postAnswer: (req, res) => {
    console.log(req.body);
    models.QandA.postAnswerDB(req.body)
      .then(() => {
        console.log('Successfully posted answer answer to db');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('Error posting answer to db', err);
      });
  },
};

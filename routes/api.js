const express = require("express");

const Question = require("../models/question");
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router();

router.get("/questions", (req, res) => {
    Question.find({ }, (err, questions) => {
        if (questions) {
            ret = ''
          questions.forEach(function (question) {
            const {questionText, answer, author} = question
            ret += `user ${author} asked: ${questionText}. This is the answer: ${answer} \n`
          })
          res.send(ret)
        } else {
          res.send(`no questions yet`)
        }
      })
});

router.post("/questions/add", isAuthenticated, async (req, res) => {
  const { questionText, author } = req.body;

  try {
    await Question.create({ questionText, author });
    res.send("question created succesfully");
  } catch {
    res.send("failure occurs when creating the question");
  }
});

router.post("/questions/answer", isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body;

  try {
    await Question.findOneAndUpdate({ _id }, { answer }, { useFindAndModify: true })
    res.send('answer added is successful')
  } catch {
    res.send('failure occurs when adding answer')
  }
});

module.exports = router;

//const dao = require('../model/QuestionDaoMem.js');
const dao = require('../model/QuestionDaoMongo.js');
exports.getAll = async function(req,res,next)// Sends array of all questions
{
   res.status(200);
   res.send(await dao.readAll());
   res.end();
}

exports.getById = async function(req,res,next)//Sends a question corresponding to the given ID
{
    res.status(200);
    res.send(await dao.read(req.params.id));
    res.end();
}

exports.create = function(req,res,next)// Creates a question from the form
{
    let newQuestion = {};
    newQuestion.Topic = req.body.topicArea;
    newQuestion.Question = req.body.questionArea;
    newQuestion.Answer = req.body.answerArea; 
    newQuestion.WrongAnswer1 =  req.body.wrongAnswerArea1;
    newQuestion.WrongAnswer2 =  req.body.wrongAnswerArea2;
    newQuestion.WrongAnswer3 =  req.body.wrongAnswerArea3;
    dao.create(newQuestion);
}

exports.delete = function(req,res,next)// Deletes the question corresponding to the given ID
{
    res.status(200);
    let id = req.params.id;
    dao.del(id);
    res.redirect('../Question List.html');
}

exports.checkEdit = function(req,res,next)// Sends all editing information
{
    res.status(200);
    res.send(dao.editing);
    res.end();
}

exports.update = function(req,res,next)// Indicate which question is being edited
{
    res.status(200);
    let id = req.params.id;
    dao.setEdit(id);
    res.redirect('../Add Question Form.html');
}

exports.postUpdate = function(req,res,next)// Gets the updated question from the website
{
    let updatedQuestion = {};
    updatedQuestion._id = dao.editing[0]._id;
    updatedQuestion.Topic = req.body.topicArea;
    updatedQuestion.Question = req.body.questionArea;
    updatedQuestion.Answer = req.body.answerArea; 
    updatedQuestion.WrongAnswer1 = req.body.wrongAnswerArea1;
    updatedQuestion.WrongAnswer2 = req.body.wrongAnswerArea2;
    updatedQuestion.WrongAnswer3 = req.body.wrongAnswerArea3;
    dao.update(updatedQuestion);
}

exports.cancelUpdate = function(req,res,next)// Cancels the updating of a question
{
    dao.stopEditing();
    res.redirect('../Question List.html');
}
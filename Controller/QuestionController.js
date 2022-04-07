const dao = require('../model/QuestionDaoMem.js');
exports.getAll = function(req,res,next)
{
   res.status(200);
   res.send(dao.readAll());
   res.end();
}

exports.getById = function(req,res,next)
{
    res.status(200);
    res.send(dao.read(parseInt(req.params.id)));
    res.end();
}

exports.create = function(req,res,next)
{
    let newQuestion = {}; // empty object
    newQuestion._id = 0;
    newQuestion.Topic = req.body.topicArea;
    newQuestion.Question = req.body.questionArea;
    newQuestion.Answer = req.body.answerArea; 
    newQuestion.WrongAnswer1 =  req.body.wrongAnswerArea1;
    newQuestion.WrongAnswer2 =  req.body.wrongAnswerArea2;
    newQuestion.WrongAnswer3 =  req.body.wrongAnswerArea3;
    dao.create(newQuestion);
}

exports.delete = function(req,res,next)
{
    res.status(200);
    let id = parseInt(req.params.id);
    dao.del(id);
    res.redirect('../Question List.html');
}

exports.checkEdit = function(req,res,next)
{
    res.status(200);
    res.send(dao.editing);
    res.end();
}

exports.update = function(req,res,next)
{
    res.status(200);
    let id = parseInt(req.params.id);
    dao.setEdit(id);
    res.redirect('../Add Question Form.html');
}

exports.postUpdate = function(req,res,next)
{
    let updatedQuestion = {}; // empty object
    updatedQuestion._id = parseInt(req.body.idArea);
    updatedQuestion.Topic = req.body.topicArea;
    updatedQuestion.Question = req.body.questionArea;
    updatedQuestion.Answer = req.body.answerArea; 
    updatedQuestion.WrongAnswer1 = req.body.wrongAnswerArea1;
    updatedQuestion.WrongAnswer2 = req.body.wrongAnswerArea2;
    updatedQuestion.WrongAnswer3 = req.body.wrongAnswerArea3;
    dao.update(updatedQuestion);
}

exports.cancelUpdate = function(req,res,next)
{
    dao.stopEditing();
    res.redirect('../Question List.html');
}
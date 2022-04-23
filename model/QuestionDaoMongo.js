const { Db } = require('mongodb');
const mongoose = require('mongoose');
exports.editing = [{editing:0,_id:'',Topic:'',Question:'',Answer:'',WrongAnswer1:'',WrongAnswer2:'',WrongAnswer3:''}];

const questionSchema = new mongoose.Schema({
    Topic: String,
    Question: String,
    Answer: String,
    WrongAnswer1: String,
    WrongAnswer2: String,
    WrongAnswer3: String,
 });

 const questionModel = mongoose.model('question', questionSchema);

 exports.create = async function(question){
    const mongoQuestion = new questionModel(question);
    await mongoQuestion.save();
    return await exports.read(mongoQuestion._id);
    //Used the read function because in tests it kept returning the _id in the beginning rather than end
 }
 
 exports.readAll = async function(){
    const questions = await questionModel.find();
    return questions;
 }
 
 exports.read = async function(id){
    let question = await questionModel.findById(id);
    return question;
}

exports.del = async function(id){
    let question = await questionModel.findByIdAndDelete(id);
    return question;
}

exports.deleteAll = async function(){
    await questionModel.deleteMany();
}

exports.setEdit = async function(id)// Indicates that a question is being edited and stores the question corresponding to the given ID
{
    let question = await exports.read(id);
    exports.editing[0].editing = 1;
    exports.editing[0]._id = question._id;
    exports.editing[0].Topic = question.Topic;
    exports.editing[0].Question = question.Question;
    exports.editing[0].Answer = question.Answer;
    exports.editing[0].WrongAnswer1 = question.WrongAnswer1;
    exports.editing[0].WrongAnswer2 = question.WrongAnswer2;
    exports.editing[0].WrongAnswer3 = question.WrongAnswer3;
}

exports.update = async function(question)// Takes a question with an exisiting ID and replaces the question in Questions.json with the given question
{                                  // Also indicates that a question is no longer being edited
    exports.stopEditing();
    let id = { _id: question._id };
    let updates = { $set: {Topic: question.Topic, Question: question.Question, Answer: question.Answer, WrongAnswer1: question.WrongAnswer1, WrongAnswer2: question.WrongAnswer2, WrongAnswer3: question.WrongAnswer3}};
    await questionModel.updateOne(id, updates);
}

exports.stopEditing = function()// Indicates that an edit is no longer being made and has been ended
{
    exports.editing[0].editing = 0;
}
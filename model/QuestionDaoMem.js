exports.fs = require("fs");
exports.questions;//This stores the parsed json file and gets updated for all the exports functions incase Questions.json is edited while the server is running
exports.editing = [{editing:0,_id:0,Topic:'',Question:'',Answer:'',WrongAnswer1:'',WrongAnswer2:'',WrongAnswer3:''}];
//Object that stores 0 if the form is adding a question and 1 if it's updating a question, along with the question being updated
//Also I made it an array because I couldn't figure how to send an object by itself

exports.parseQuestions = function()
{
    try
    {
        exports.questions = JSON.parse(exports.fs.readFileSync("./Questions.json"));
    }
    catch(err)//If file doesn't exist or is empty, then format an empty one that can store questions and return the parsed version
    {
        let emptyJson = '{"questions":[]}';
        exports.fs.writeFileSync("./Questions.json", emptyJson, (err) => {
            // Error checking
            if (err) throw err;
        });
        exports.questions = JSON.parse(exports.fs.readFileSync("./Questions.json"));
    }
}

exports.readAll = function()//Returns array of all questions
{
    exports.parseQuestions();
    return exports.questions["questions"];
}

exports.create = function(question)// Takes a question, gives it an ID, and saves it in Questions.json
{
    exports.parseQuestions();
    if(exports.questions["questions"].length===0)
    {
        question._id = 1;
    }
    else
    {
       question._id = (exports.questions["questions"][exports.questions["questions"].length-1]._id)+1;
    }
    exports.questions["questions"].push(question);
    let updatedQuestions = JSON.stringify(exports.questions);
    exports.fs.writeFileSync("./Questions.json", updatedQuestions, (err) => {if (err) throw err;});
      return question;
}

exports.pos = function(id)//Exported this so I could test it and get enough statement coverage
{
    //console.log("Looking for ID: " + id);
    for(let i=0; i< exports.questions["questions"].length; i++)
    {
        //console.log("Question id is: " + exports.questions["questions"][i]._id);
        if(parseInt(exports.questions["questions"][i]._id) === parseInt(id))
        {
           return i;
        }
    }
    //console.log("Questions are: ");
    //console.log(JSON.stringify(exports.questions["questions"]));
    return -1;
}

exports.read = function(id)//Returns the question corresponding to the given ID
{
    exports.parseQuestions();
    let index = exports.pos(id);
    if(index>=0)
    {
        return exports.questions["questions"][index];
    }
    return null;
}

exports.del = function(id)//Deletes the question corresponding to the given ID
{
    exports.parseQuestions();
    let index = exports.pos(id);
    let question = null; 
    if(index>=0)
    {
        question = exports.questions["questions"][index];
        exports.questions["questions"].splice(index,1);
        let updatedQuestions = JSON.stringify(exports.questions);
        exports.fs.writeFileSync("./Questions.json", updatedQuestions, (err) => {if (err) throw err;});
    }
    return question;  
}

exports.update = function(question)// Takes a question with an exisiting ID and replaces the question in Questions.json with the given question
{                                  // Also indicates that a question is no longer being edited
    exports.parseQuestions();
    let index = exports.pos(question._id);
    exports.editing[0].editing = 0;
    if(index>=0)
    {
        exports.questions["questions"][index] = question;
        let updatedQuestions = JSON.stringify(exports.questions);
        exports.fs.writeFileSync("./Questions.json", updatedQuestions, (err) => {if (err) throw err;});
        return 0;
    }
    return 1;
}
exports.setEdit = function(id)// Indicates that a question is being edited and stores the question corresponding to the given ID
{
    exports.parseQuestions();
    let index = exports.pos(id);
    //console.log("Got index: " + index);
    exports.editing[0].editing = 1;
    exports.editing[0]._id = exports.questions["questions"][index]._id;
    exports.editing[0].Topic = exports.questions["questions"][index].Topic;
    exports.editing[0].Question = exports.questions["questions"][index].Question;
    exports.editing[0].Answer = exports.questions["questions"][index].Answer;
    exports.editing[0].WrongAnswer1 = exports.questions["questions"][index].WrongAnswer1;
    exports.editing[0].WrongAnswer2 = exports.questions["questions"][index].WrongAnswer2;
    exports.editing[0].WrongAnswer3 = exports.questions["questions"][index].WrongAnswer3;
}

exports.stopEditing = function()// Indicates that an edit is no longer being made and has been cancelled
{
    exports.editing[0].editing = 0;
}
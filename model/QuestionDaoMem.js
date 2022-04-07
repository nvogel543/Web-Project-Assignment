const fs = require("fs");
exports.questions = JSON.parse(fs.readFileSync("./Questions.json"));
exports.editing = [{editing:0,_id:0,Topic:'',Question:'',Answer:'',WrongAnswer1:'',WrongAnswer2:'',WrongAnswer3:''}];
//Object that stores 0 if the form is adding a question and 1 if it's updating a question, along with the question
exports.readAll = function(){ return exports.questions["questions"]; }

exports.create = function(question){
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
    fs.writeFile("./Questions.json", updatedQuestions, (err) => {
        // Error checking
        if (err) throw err;
        //console.log("New data added");
      });
}

function pos(id)
{// not exported, finds the pos in the array
    for(let i=0; i< exports.questions["questions"].length; i++)
        if(exports.questions["questions"][i]._id === id)
        {
           return i;
        }
    return -1;
}

exports.read = function(id)
{ 
    let index = pos(id);
    if(index>=0)
    {
        return exports.questions["questions"][index];
    }
    return null;
}

exports.del = function(id){
    let index = pos(id);
    let question = null; 
    if(index>=0)
    {
        question = exports.questions["questions"][index];
        exports.questions["questions"].splice(index,1);
        let updatedQuestions = JSON.stringify(exports.questions);
        fs.writeFile("./Questions.json", updatedQuestions, (err) => {
            // Error checking
            if (err) throw err;
            //console.log("New data added");
        });
    }
    return question;  
}

exports.update = function(question)
{ 
    let index = pos(question._id);
    exports.editing[0].editing = 0;
    if(index>=0)
    {
        exports.questions["questions"][index] = question;
        let updatedQuestions = JSON.stringify(exports.questions);
        fs.writeFile("./Questions.json", updatedQuestions, (err) => {
            // Error checking
            if (err) throw err;
            //console.log("New data added");
        });
        return 0;
    }
    return 1;
}
exports.setEdit = function(id)
{
    let index = pos(id);
    console.log("Got index: " + index);
    exports.editing[0].editing = 1;
    exports.editing[0]._id = exports.questions["questions"][index]._id;
    exports.editing[0].Topic = exports.questions["questions"][index].Topic;
    exports.editing[0].Question = exports.questions["questions"][index].Question;
    exports.editing[0].Answer = exports.questions["questions"][index].Answer;
    exports.editing[0].WrongAnswer1 = exports.questions["questions"][index].WrongAnswer1;
    exports.editing[0].WrongAnswer2 = exports.questions["questions"][index].WrongAnswer2;
    exports.editing[0].WrongAnswer3 = exports.questions["questions"][index].WrongAnswer3;
}

exports.stopEditing = function()
{
    exports.editing[0].editing = 0;
}
  
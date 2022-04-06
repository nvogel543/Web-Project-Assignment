const express = require('express');
const morgan = require('morgan');
const fs = require("fs");
const app = express();
app.use(morgan('dev'));

let hostname = 'localhost';
let port = 4000;
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const server=app.listen(port,hostname,function(){
   console.log(`Server running in ${hostname}:${port}`);
});

app.get('/question',function(req,res,next){
    let questions = JSON.parse(fs.readFileSync("./Questions.json")).questions;
    res.status(200);
    res.send(questions);
    res.end();
 });

 app.post('/question',function(req,res,next){
   let newQuestion = {}; // empty object
   newQuestion._id = 0;
   newQuestion.Topic = req.body.topicArea;
   newQuestion.Question = req.body.questionArea;
   newQuestion.Answer = req.body.answerArea; 
   newQuestion.WrongAnswer1 =  req.body.wrongAnswerArea1;
   newQuestion.WrongAnswer2 =  req.body.wrongAnswerArea2;
   newQuestion.WrongAnswer3 =  req.body.wrongAnswerArea3;
   //console.log('Data collected: ');
   //console.log(JSON.stringify(newQuestion));

   let questions = fs.readFileSync("Questions.json");
   let questionsParsed = JSON.parse(questions);
   //console.log('Parsed Questions are: ');
   //console.log(JSON.stringify(questionsParsed));
   //let lastElement = questionsParsed["questions"][questionsParsed["questions"].length-1];
   //console.log('Last element is: ');
   //console.log(lastElement);
   newQuestion._id = (questionsParsed["questions"][questionsParsed["questions"].length-1]._id)+1;
   questionsParsed["questions"].push(newQuestion);

   let updatedQuestions = JSON.stringify(questionsParsed);
   fs.writeFile("Questions.json", updatedQuestions, (err) => {
    // Error checking
    if (err) throw err;
    //console.log("New data added");
  });
});

app.get('/deletequestion/:id',function(req,res,next){
  let questions = JSON.parse(fs.readFileSync("./Questions.json"));
  let id = parseInt(req.params.id);
  //console.log("Deleting Question " + id);
  let pos = null;
  for(let i=0; i<questions["questions"].length; i++){
    if(questions["questions"][i]._id === id)
    {
      pos = i;
      //console.log("Found Element " + pos);
      break;
    }
  }
  if(questions["questions"][pos]!=null)
  {
     questions["questions"].splice(pos,1);
     fs.writeFile("Questions.json", JSON.stringify(questions), (err) => {
      // Error checking
      if (err) throw err;
      //console.log("New data added");
    });
    //console.log("Deleted element " + pos);
  }
  res.redirect('../Question List.html');
});


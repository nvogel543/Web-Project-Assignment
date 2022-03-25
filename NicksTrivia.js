const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

let hostname = 'localhost';
let port = 4000;
app.use(express.static('public'));

const server=app.listen(port,hostname,function(){
   console.log(`Server running in ${hostname}:${port}`);
});

//let QuestionsJSON = require('./Questions.json');
let questions = require('./Questions.json').questions;

app.get('/question',function(req,res,next){
    res.status(200);
    res.send(questions);
    res.end();
 });
 
const readQuestions = async function(){
  let out = `<table class="table table-striped table-hover">
          <thead><tr><th>ID</th><th>Login</th></tr><\thead>`;
  for(let i=0; i<questions.length; i++){
     out += `<tr> <td>${questions[i]._id}</td>
             <td>${questions[i].Topic}</td>
             <td>${questions[i].Question}</td>
             <td>${questions[i].Answer}</td>
             <td>${questions[i].WrongAnswer1}</td>
             <td>${questions[i].WrongAnswer2}</td>
             <td>${questions[i].WrongAnswer3}</td></tr>`;
  }
  out += `</table>`; 
  document.getElementById('QuestionData').innerHTML = out;
}

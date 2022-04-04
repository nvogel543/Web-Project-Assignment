const fs = require("fs");
var data = fs.readFileSync("Questions.json");
const obj = JSON.parse(data);
obj["questions"].push({ "_id":9,
"Topic":"History",
"Question": "Test",
"Answer":"ans",
"WrongAnswer1":"wans1",
"WrongAnswer2":"wans2",
"WrongAnswer3":"wans3"});

let data2 = JSON.stringify(obj);
fs.writeFile("Questions.json", data2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });

console.log('Finished');
const dao = require('../model/QuestionDaoMem.js');

test('Read All',function()
{
    let questions = dao.readAll();
    expect(questions.length).toBeGreaterThan(0);
});

test('Create Question',function()
{
    let newquestion = {_id:0,Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let beforeSize = dao.readAll().length;
    let saved = dao.create(newquestion);
    console.log("Saved ID is: " + saved._id);
    let questions = dao.readAll();
    expect(questions.length).toBe(beforeSize+1);
    expect(questions).toContainEqual(saved);
    dao.del(saved._id);
});

test('Read Question',function()
{
    expect(dao.readAll()[0]).toStrictEqual(dao.read(1));
});

test('Delete Question',function()
{
    let newquestion = {_id:0,Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let originalQuestions = dao.readAll();
    let saved = dao.create(newquestion);
    let deleted = dao.del(saved._id);
    expect(saved).toStrictEqual(deleted);
    expect(originalQuestions).toStrictEqual(dao.readAll());
});

test('Update',function()
{
    let newquestion = {_id:0,Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let saved = dao.create(newquestion);
    saved.Question = 'How many html files are there?';
    dao.update(saved);
    expect(saved).toStrictEqual(dao.read(saved._id));
    dao.del(saved._id);
});

test('Set Edit', function()
{
    let newquestion = {_id:0,Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let saved = dao.create(newquestion);
    dao.setEdit(saved._id);
    let editing = [{editing:1,_id:0,Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'}];
    editing[0]._id = saved._id;
    expect(editing).toStrictEqual(dao.editing);
    dao.del(saved._id);
});

test('Stop Editing', function()
{
    dao.editing[0].editing = 1;
    dao.stopEditing();
    expect(dao.editing[0].editing).toBe(0);
});

test('Parse Questions', function()
{
    let questions = JSON.parse(dao.fs.readFileSync("./Questions.json"));
    dao.parseQuestions();
    expect(questions).toStrictEqual(dao.questions);
});

test('Get position', function()
{
    expect(dao.pos(1)).toBe(0);
});
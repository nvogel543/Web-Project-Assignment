const dbcon = require('../model/DbConnection');
const dao = require('../model/QuestionDaoMongo.js');

beforeAll(function(){
    dbcon.connect(1);
});
afterAll(async function(){
    await dao.deleteAll();
    dbcon.disconnect();
});
beforeEach(async function(){
    await dao.deleteAll();
});

test('Read All', async function()
{
    let questions = await dao.readAll();
    expect(questions.length).toBe(0);
});

test('Create Question', async function()
{
    let newquestion = {Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let questions = await dao.readAll();
    let beforeSize = questions.length;
    let saved = await dao.create(newquestion);
    questions = await dao.readAll();
    expect(questions.length).toBe(beforeSize + 1);
    expect(JSON.stringify(questions[0])).toBe(JSON.stringify(saved));
    // Used strings because the mongodb objects appear to be bugged when testing them
});

test('Read Question', async function()
{
    let newquestion = {Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let saved = await dao.create(newquestion);
    let questions = await dao.readAll();
    expect(JSON.stringify(questions[0])).toBe(JSON.stringify(await dao.read(saved._id)));
});

test('Delete Question',function()
{
    let newquestion = {Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let originalQuestions = dao.readAll();
    let saved = dao.create(newquestion);
    let deleted = dao.del(saved._id);
    expect(saved).toStrictEqual(deleted);
    expect(originalQuestions).toStrictEqual(dao.readAll());
});

test('Update', async function()
{
    let newquestion = {Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let saved = await dao.create(newquestion);
    saved.Question = 'How many html files are there?';
    await dao.update(saved);
    expect(JSON.stringify(saved)).toBe(JSON.stringify(await dao.read(saved._id)));
});

test('Set Edit', async function()
{
    let newquestion = {Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'};
    let saved = await dao.create(newquestion);
    await dao.setEdit(saved._id);
    let editing = [{editing:1,_id:'',Topic:'Tests',Question:'How many tests are there?',Answer:'Enough',WrongAnswer1:'Not enough',WrongAnswer2:'Too many',WrongAnswer3:'None'}];
    editing[0]._id = saved._id;
    expect(JSON.stringify(editing)).toBe(JSON.stringify(dao.editing));
});

test('Stop Editing', function()
{
    dao.editing[0].editing = 1;
    dao.stopEditing();
    expect(dao.editing[0].editing).toBe(0);
});
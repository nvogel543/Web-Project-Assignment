const questionCont = require('./controller/QuestionController');
const express = require('express');
const morgan = require('morgan');
exports.app = express();
exports.app.use(morgan('dev'));

exports.app.use(express.static('public'));

exports.app.use(express.urlencoded({extended: true}));
exports.app.use(express.json());
// Remaining code after the imports

exports.app.get('/question', questionCont.getAll);
exports.app.get('/question/:id', questionCont.getById);
exports.app.post('/question', questionCont.create);
exports.app.get('/deletequestion/:id', questionCont.delete);
exports.app.get('/editquestion', questionCont.checkEdit);
exports.app.get('/updatequestion/:id', questionCont.update);
exports.app.post('/updatequestion/', questionCont.postUpdate);
exports.app.get('/cancelupdate', questionCont.cancelUpdate);
/*app.post('/updateuser', userCont.postCreateOrUpdate);
app.put('/user', userCont.postCreateOrUpdate);
app.delete('/user/:id', userCont.remove);
app.get('/deleteuser/:id', userCont.remove);*/
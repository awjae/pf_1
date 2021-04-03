const server = {};

const express = require('express');
const http = require('http');
const path = require('path');
const static = require('serve-static');
const cors = require('cors');
const bodyParser = require('body-parser');

const session= require('express-session');

const app = express();

app.set('views',path.join(__dirname,'../client'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
//렌딩 페이지 다루기

//세션을 위한 초기화 작업, 등록을해주는다는 느낌
app.use(session({
    secret: 'mykey',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({limit:'50mb', extended:false}));
app.use(bodyParser.json({limit:'50mb'}));

// 사전에 처리하고 싶은경우 app.use사용
app.use('/', static(path.join(__dirname, '../client/dist')));
app.use(cors());

const router = express.Router();
app.use('/', router);

const port = process.env.PORT || 80;

server.start = function() {
    http.createServer(app).listen(port, function() {
    console.log('웹 서버 실행됨: ' + port);
    });
};

server.post = function(reqPath, callback) {
    router.route(reqPath).post(callback);
}

server.get = function(reqPath, callback) {
    router.route(reqPath).get(callback);
}

server.put = function(reqPath, callback) {
    router.route(reqPath).put(callback);
}
server.delete = function(reqPath, callback) {
    router.route(reqPath).delete(callback);
}

server.router = router;

module.exports = server;
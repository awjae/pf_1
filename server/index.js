const server = require('./server');
const proxyReq = require('request');
const database = require('./database');
const util = require('./util');

//기본 메인 페이지
server.get('/', function(req, res) {
    console.log(req.originalUrl + '/ 요청.');
    
    req.app.render('index', '', function(err, html) {
        if (err) {
            console.log('view 처리 시 에러 발생 ->' + err);
            return;
        }
        res.end(html);
    });
});
//로그인 팝
server.get('/loginPop', function(req, res) {
    console.log('/loginPop.');
    
    req.app.render('index', '', function(err, html) {
        if (err) {
            console.log('view 처리 시 에러 발생 ->' + err);
            return;
        }
        
        res.end(html);
    });
});
//에러페이지등 일단 index처리
server.get('*', function(req, res) {
    console.log('* 요청.');
    
    req.app.render('index', '', function(err, html) {
        if (err) {
            console.log('view 처리 시 에러 발생 ->' + err);
            return;
        }
        
        res.end(html);
    });
});
// id 중복찾기
server.post('/checkId.do', function (req, res) {
    console.log('/checkId.do 요청됨');
    console.log('PARAMS');
    console.dir(req.body);

    const paramId = req.body.id;

    const sql = 'select * FROM public."user" where id = $1';

    const dbParams = [paramId];
    
    database.PgQuery(res, sql, dbParams, function(err, rows) {
        
        if (rows.length > 0) {
            req.session.user= {
                id: rows[0].id,
                name: rows[0].name
            };
            util.sendResponse(res, rows);
        } else {
            util.sendResponse(res, []);
        } 
        
    });

});

//회원가입
server.put('/insertUser.do', function (req, res) {
    console.dir(req.body);
    const sql = 'insert into public."user"(id, name, email, pw) values($1, $2, $3, $4)';

    const dbParams = [req.body.id, req.body.name, req.body.email, req.body.pw];
    
    database.PgQuery(res, sql, dbParams, function(err, rows) {
        
        if (rows.length > 0) {
            req.session.user= {
                id: rows[0].id,
                name: rows[0].name
            };
            util.sendResponse(res, rows);
        } else {
            util.sendResponse(res, []);
        } 
        
    });

});

//로그인
server.post('/loginUser.do', function (req, res) {
    console.dir('loginUser 요청');
    const sql = 'select * FROM public."user" where id = $1 AND pw = $2';

    const dbParams = [req.body.id, req.body.pw];
    
    database.PgQuery(res, sql, dbParams, function(err, rows) {
        console.log(rows)
        if (rows.length > 0) {
            req.session.user= {
                id: rows[0].id,
                pw: rows[0].pw,
                name : rows[0].name,
                email : rows[0].email
            };
            util.sendResponse(res, rows);
        } else {
            util.sendResponse(res, []);
        } 
        
    });

});

//
server.put('/insertBookmark.do', function (req, res) {
    console.dir('insertBookmark 요청');

    const sql = 'INSERT INTO public.bookmark(name, x, y, id) VALUES ($1, $2, $3, $4);';

    const dbParams = [req.body.name, req.body.x, req.body.y, req.body.id];
    
    database.PgQuery(res, sql, dbParams, function(err, rows) {
        console.log(rows)
        if (rows.length > 0) {
            util.sendResponse(res, rows);
        } else {
            util.sendResponse(res, []);
        } 
        
    });

})

//post 요청
server.post('/postList.do', function (req, res) {
    console.log('/postList.do 요청됨');
    console.log('PARAMS');
    console.dir(req.body);

    var paramId = req.body.id;
    var paramPw = req.body.pw;

    var sql = "select id, pw from test.users where id = ? and pw = ?";

    var dbParams = [paramId, paramPw];
    
    database.query(res, sql, dbParams, function(err, rows) {
        
        req.session.user= {
            id: rows[0].id,
            name: rows[0].name
        };
        
        if (rows.length > 0) {
            util.sendResponse(res, rows);
        } else {
            util.sendResponse(res, []);
        } 
        
    });

});

//프록시 요청
server.post('/proxy.do', function (req, res) {
    console.log('프록시 요청 실행')

    const { baseUrl, extraUrl } = req.body;
    proxyReq(encodeURI(baseUrl+extraUrl)).pipe(res);
});
//프록시 요청 except encode
server.post('/proxyNaE.do', function (req, res) {
    console.log('프록시 요청 실행')

    const { baseUrl, extraUrl, key } = req.body;
    proxyReq(encodeURI(baseUrl+extraUrl)+key).pipe(res);
});

server.start();
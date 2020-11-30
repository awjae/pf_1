const server = require('./server');
const proxyReq = require('request');

//기본 메인 페이지
server.get('/', function(req, res) {
    console.log('/ 요청.');
    
    req.app.render('index', '', function(err, html) {
        if (err) {
            console.log('view 처리 시 에러 발생 ->' + err);
            return;
        }
        
        res.end(html);
    });
});

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
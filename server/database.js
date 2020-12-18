const database = {};
const util = require('./util'); // util.js안의 정보를 요청함
//pg
const pg = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'pf1',
    password : 'postgres',
    port : 5432,
});
pg.connect();

//pg
database.PgQuery = function(res, sql, dbParams, callback) {

    pg.query(sql, dbParams, (err, res) => {
        if (err) {
            console.log(err.stack)
            console.log('pgQuery 에러')
            return;
        } else {
            //console.log(res.rows[0]);
        }
        if (callback) {
            callback(null, res.rows);  
        }    
    });
}

module.exports = database;
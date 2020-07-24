
const configMySQL = require('../config/MySQL.config')
const mysql = require('mysql');

exports.setComment = async (req, res) => {
    const connection = mysql.createConnection({
        host: configMySQL.host,
        port: configMySQL.port,
        user: configMySQL.user,
        password: configMySQL.password,
        database: configMySQL.database
    });
    await connection.query(`INSERT INTO comentario (comentario) VALUES ('${req.body.comment}')`, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
    })
}

exports.getComments = async (req, res) => {
    const connection = mysql.createConnection({
        host: configMySQL.host,
        port: configMySQL.port,
        user: configMySQL.user,
        password: configMySQL.password,
        database: configMySQL.database
    });
    await connection.query(`SELECT * FROM comentario`, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
    })
}
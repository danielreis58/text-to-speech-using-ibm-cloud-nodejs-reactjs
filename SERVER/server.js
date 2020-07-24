const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const textToSpeech = require('./app/config/IBMauth.config')
const configMySQL = require('./app/config/MySQL.config')
const configVoice = require('./app/config/IBMvoice.config')

const mysql = require('mysql');
const fs = require('fs');

const commentRouter = require('./app/routers/commentRouter');
const voiceRouter = require('./app/routers/voiceRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})

app.use('/comment', commentRouter);
app.use('/voice', voiceRouter);
app.use('/audio', express.static('audios'));

app.get('/', (req, res) => res.send("Proxy Google!!!"));

const server = app.listen(4000, function () {
    const connection = mysql.createConnection({
        host: configMySQL.host,
        port: configMySQL.port,
        user: configMySQL.user,
        password: configMySQL.password,
        database: configMySQL.database
    });
    connection.connect(function (err) {
        if (err) return console.log(err);
        console.log('Conectado ao banco!');
        connection.query(`SELECT * FROM comentario`, function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Sintetizando os comentarios!');
                results.map(async (item) => {
                    const synthesizeParams = {
                        text: `${item.comentario}`,
                        accept: configVoice.accept,
                        voice: configVoice.voice,
                    };
                    await textToSpeech.synthesize(synthesizeParams)
                        .then(response => {
                            return textToSpeech.repairWavHeaderStream(response.result);
                        })
                        .then(buffer => {
                            console.log('Gerando arquivo de audio' + item.id + '.wav');
                            fs.writeFileSync(`audios/${item.id}.wav`, buffer);
                        })
                        .catch(err => {
                            console.log('error:', err);
                        });

                })

            }
            connection.end();
        })
    })
    console.log("App listening at http://%s:%s", server.address().address.toString(), server.address().port);
})
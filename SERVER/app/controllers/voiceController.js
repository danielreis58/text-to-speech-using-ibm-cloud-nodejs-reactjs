
const textToSpeech = require('../config/IBMauth.config')
const configVoice = require('../config/IBMvoice.config')

const fs = require('fs');

exports.synthesize = async (req, res) => {
    const synthesizeParams = {
        text: `${req.body.comment}`,
        accept: configVoice.accept,
        voice: configVoice.voice,
    };

    await textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            // only necessary for wav formats,
            // otherwise `response.result` can be directly piped to a fileconst fs = require('fs');            
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
            fs.writeFileSync(`audios/${req.body.id}.wav`, buffer);
            res.json({ status: "true" })
        })
        .catch(err => {
            console.log('error:', err);
        });
}


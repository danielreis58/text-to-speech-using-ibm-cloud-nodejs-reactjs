require('dotenv').config()

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_API_KEY,
    }),
    url: process.env.IBM_API_URL,
});

module.exports = textToSpeech 
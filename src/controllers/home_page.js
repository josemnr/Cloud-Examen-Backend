const {config} = require('../../config');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: config.apikey,
  }),
  serviceUrl: config.serviceUrl,
});

//Método para render de la página del Adder
exports.renderHomePage = (req, res) => {
    res.render("index");
}

exports.sendData = (req, res) => {
    console.log(req.body.entry)
    let text = req.body.entry
    const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
    };
      
    toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
    //   console.log(JSON.stringify(toneAnalysis, null, 2));
        res.render("index", {
            response:JSON.stringify(toneAnalysis, null, 2)
        });
    })
    .catch(err => {
        console.log('error:', err);
        res.render("index", {
            response:JSON.stringify(err, null, 2)
        });
    });
}
const express = require('express');
const app = new express();
// IBM Watson NLU requirements
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const dotenv = require("dotenv");


// Static now serves the ReactJS app
app.use(express.static('client'))
// CORS module loaded to remove CORS error
const cors_app = require('cors');
app.use(cors_app());

// IBM Watson NLU
dotenv.config(".env");
let getNLUInstance = () =>{
    const nlu = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: process.env.API_KEY, }),
    serviceUrl: process.env.API_URL, });
    return nlu;
}

// TEST CODE GOES HERE
// let temp = {
// //   'url': 'www.ibm.com',
//   "text": "The small brown fox ran faster than the dog.",
//   'features': {
//       'sentiment': {
//           'document': true,
//           'topics': []
//       }}
// };
// console.log('1. Watson ask: ', temp);

// const nlu = getNLUInstance();
// nlu.analyze(temp).then(results => {
//         console.log("!! Received: ", results.statusText);
//         console.log("!! Data: ", results.result.sentiment.document);
//     }).catch(err => {
//     console.log('!! Error:', err);
//     console.log('!! Error:', err.message);
// });

// // Change to Emoti0n
// temp['features'] = {
//       'emotion': {
//           'document': true,
//           'topics': []
// }};
// console.log('2. Watson ask: ', temp);

// nlu.analyze(temp).then(results => {
//         console.log("!! Received: ", results.statusText);
//         console.log("!! Data: ", results.result.emotion.document.emotion);
//     }).catch(err => {
//     console.log('!! Error:', err);
//     console.log('!! Error:', err.message);
// });

// END TEST CODE


// Resource paths
app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    console.log("!! Req: ", req.query.url);
    analysisRequest = {
        'url': req.query.url,
        'features': {
            'emotion': {
                'document': true,
                'topics': []
            }}
        };
    
    getNLUInstance().analyze(analysisRequest).then(results => {
        console.log("!! Received: ", results.statusText);
        console.log("!! Data: ", results.result.emotion.document.emotion);
        return res.send(results.result.emotion.document.emotion)
    }).catch(err => {
    console.log('!! Error:', err.statusText);
    return res.status(400).json({'Error': err.message});
    });
});

app.get("/url/sentiment", (req,res) => {
    console.log("!! Req: ", req.query.url);
    analysisRequest = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                'document': true,
                'topics': []
            }}
        };
    
    getNLUInstance().analyze(analysisRequest).then(results => {
        console.log("!! Received: ", results.statusText);
        console.log("!! Data: ", results.result.sentiment.document);
        return res.send(results.result.sentiment.document)
    }).catch(err => {
    console.log('!! Error:', err.statusText);
    return res.status(400).json({'Error': err.message});
    });
});

app.get("/text/emotion", (req,res) => {
    console.log("!! Req: ", req.query.text);
    analysisRequest = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'document': true,
                'topics': []
            }}
        };
    
    getNLUInstance().analyze(analysisRequest).then(results => {
        console.log("!! Received: ", results.statusText);
        console.log("!! Data: ", results.result.emotion.document.emotion);
        return res.send(results.result.emotion.document.emotion)
    }).catch(err => {
    console.log('!! Error:', err.statusText);
    return res.status(400).json({'Error': err.message});
    });

});

app.get("/text/sentiment", (req,res) => {
   console.log("!! Req: ", req.query.text);
    analysisRequest = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'document': true,
                'topics': []
            }}
        };
    
    getNLUInstance().analyze(analysisRequest).then(results => {
        console.log("!! Received: ", results.statusText);
        console.log("!! Data: ", results.result.sentiment.document);
        return res.send(results.result.sentiment.document)
    }).catch(err => {
    console.log('!! Error:', err.statusText);
    return res.status(400).json({'Error': err.message});
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})


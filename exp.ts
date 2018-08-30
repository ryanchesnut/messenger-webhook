import express from "express";
import bodyParser from "body-parser";

const app = express().use(bodyParser.json());

app.get("/", (req, res, next) => res.send("OK"));

app.listen(8180);

app.listen(process.env.PORT || 5000 , () => console.log('Webhook listening' ));

app.post('/webhook', (req, res) => {  
    let body = req.body;
    if (body.object === 'page') {
      body.entry.forEach(function(entry: any) {
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  });

app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "Y34fCtQZDZD"
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED :' + res);
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);      
      }
    }
  });


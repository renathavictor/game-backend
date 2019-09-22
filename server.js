import express from 'express';
import bodyParser from 'body-parser';

import { firebaseDB } from './firebase';
import { firebaseClass } from './firebase';

const app = express();
app.use(bodyParser.json());


app.get('/api/classes', (req, res) => {
  const classReference = firebaseClass;

  classReference.on("value",
    snapshot => {
      console.log(snapshot.val());
      res.json(snapshot.val());
      classReference.off("value");
    },
    errorObject => {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    });
  //res.send('API is working')
});

app.put('/api/classes', (req, res) => {
  console.log("HTTP Put Request");

  let name = req.body.name;
  let brain = req.body.brain;
  let defense = req.body.defense;
  let hp = req.body.hp;
  let speed = req.body.speed;
  let strenght = req.body.strenght;
  
  const referencePath = '/class/'+name+'/';
  const classReference = firebaseDB.ref(referencePath);
  classReference.set({ name, brain, defense, hp, speed, strenght },
    error => {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    });
});

app.post('/api/classes', (req, res) => {
  console.log("HTTP POST Request");

  let name = req.body.name;
  let brain = req.body.brain;
  let defense = req.body.defense;
  let hp = req.body.hp;
  let speed = req.body.speed;
  let strenght = req.body.strenght;

  const referencePath = '/class/'+name+'/';
  const classReference = firebaseDB.ref(referencePath);
  classReference.set({ name, brain, defense, hp, speed, strenght },
    error => {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    });
});

app.delete('/api/classes', (req, res) => {
  console.log("HTTP DELETE Request");
})

/* app.get('/', (req, res) => {
  console.log('http get request');
  res.send('http get request');
  firebase.database().ref('/Test').set({ Test: 'GET Request' });
}) */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


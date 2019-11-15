import express from 'express';
import bodyParser from 'body-parser';

import { firebaseDB, firebaseClass, firebaseSeeker } from './firebase';
import { firebaseLooper } from './misc';


const app = express();
app.use(bodyParser.json());

const cors = require('cors')({origin: true})

// fetch classes

app.get('/api/classes', (req, res) => {
  cors(req, res, () => {
    const classReference = firebaseClass;
  
    classReference.on("value",
      snapshot => {
        const classes = firebaseLooper(snapshot)
        res.json(classes);
        classReference.off("value");
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
        res.send("The read failed: " + errorObject.code);
      });
  })

  /* classReference.on("value",
    snapshot => {
      console.log(snapshot.val());
      res.json(snapshot.val());
      classReference.off("value");
    },
    errorObject => {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }); */
  // res.send('API is working')
});

app.get('/api/classes/:id', (req, res) => {
  cors(req, res, () => {
    const classReference = firebaseDB
  
    classReference.ref(`classes/${req.params.id}`).once('value')
      .then(snapshot => {
        res.json(snapshot)
      })
  })
})

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

// fetch seekers

app.get('/api/seekers', (req, res) => {
  console.log("HTTP GET Request");

  const seekerReference = firebaseSeeker;

  seekerReference.on("value",
    snapshot => {
      console.log(snapshot.val());
      res.json(snapshot.val());
      seekerReference.off("value");
    },
    errorObject => {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    });
});

/* app.get('/api/seekers', (req, res) => {
  cors(req, res, () => {
    const seekerReference = firebaseSeeker

    seekerReference.on("value",
      snapshot => {
        console.log(snapshot)
        const seekers = firebaseLooper(snapshot)
        res.json(seekers);
        seekerReference.off("value");
      },
      errorObject => {
        res.send("The read failed: " + errorObject.code)
      }
    );
  })
}); */


app.post('/api/seekers', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let gender = req.body.gender;
  let password = req.body.password;
  let character_name = req.body.character_name;
  let coins = req.body.coins;
  let clazz_id = req.body.clazz_id;
  let brain = req.body.brain;
  let defense = req.body.defense;
  let hp = req.body.hp;
  let speed = req.body.speed;
  let strenght = req.body.strenght;
  let confirm_password = req.body.confirm_password;

  const referencePath = '/seekers/';
  const seekerReference = firebaseDB.ref(referencePath);
  seekerReference.child(name).set({ name, email, gender, password, character_name, coins, clazz_id, brain, defense, hp, speed, strenght },
    error => {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    });

})


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


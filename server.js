import express from 'express';
import bodyParser from 'body-parser';

import { firebaseDB, firebaseClass, firebaseSeeker } from './firebase';
import { firebaseLooper } from './misc';


const app = express();
app.use(bodyParser.json());

const cors = require('cors')({origin: true})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
  next()
})

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


/* app.post('/api/seekers', (req, res) => {
  let brain = req.body.brain;
  let clazz_id = req.body.clazz_id;
  let coins = req.body.coins;
  let confirm_password = req.body.confirm_password;
  let defense = req.body.defense;
  let email = req.body.email;
  let gender = req.body.gender;
  let hp = req.body.hp;
  let password = req.body.password;
  let character_name = req.body.character_name;
  let speed = req.body.speed;
  let strenght = req.body.strenght;
  let username = req.body.username;

  const referencePath = '/seekers/';
  const seekerReference = firebaseDB.ref(referencePath);
  seekerReference.child(username).set({ username, email, gender, password, character_name, coins, clazz_id, brain, defense, hp, speed, strenght },
    error => {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    });

}) */

app.post('/api/seekers', (req, res) => {
  let username = req.body.seeker.username;
  let email = req.body.seeker.email;
  let gender = req.body.seeker.gender;
  let password = req.body.seeker.password;
  let coins = req.body.seeker.coins;
  let confirm_password = req.body.seeker.confirm_password;
  const referencePath = '/seekers';
  const seekerReference = firebaseDB.ref(referencePath);
  seekerReference.child(username).set({ username, email, gender, password, coins },
    error => {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    });

})

app.post('/api/seeker-card', (req, res) => {
  let username = req.body.seekerCard.username
  let character_name = req.body.seekerCard.character_name;
  let clazz_id = req.body.seekerCard.clazz_id;
  let brain = req.body.seekerCard.brain;
  let defense = req.body.seekerCard.defense;
  let hp = req.body.seekerCard.hp;
  let speed = req.body.seekerCard.speed;
  let strenght = req.body.seekerCard.strenght;
  let name = req.body.seekerCard.name;
  let img = req.body.seekerCard.img;

  const referencePath = '/seeker-card';
  const seekerCardReference = firebaseDB.ref(referencePath);
  seekerCardReference.child(username).set({ username, character_name, clazz_id, brain, defense, hp, speed, strenght, name, img },
    error => {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    });

})

app.get('/api/seekers/:username', (req, res) => {
  cors(req, res, () => {
    const seekersReference = firebaseDB
    seekersReference.ref(`seekers/${req.params.username}`).once('value')
      .then(snapshot => {
        res.json(snapshot)
      })
  })
})

app.get('/api/seeker-card/:username', (req, res) => {
  cors(req, res, () => {
    const seekerCardReference = firebaseDB
  
    seekerCardReference.ref(`seeker-card/${req.params.username}`).once('value')
      .then(snapshot => {
        res.json(snapshot)
      })
  })
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


const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require('cookie-session');
const fs = require('fs');
const express = require('express');
const app = express();
const multer = require('multer');
let storiacorrente;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage });

//per CORS array dei domini dei quali accetta la comunicazione
const whitelist = ['http://localhost:8081', 'http://localhost:8080'];

app.use(cors({ credentials: true, origin: whitelist }));
// Tipologia di autenticazione locale
const LocalStrategy = require('passport-local').Strategy;
const { Socket } = require("dgram");

//Creo la sessione con un cookie che dura 24 ore
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
//utilizzo effetticamente passport
app.use(passport.initialize());

app.use(passport.session());
//static files-images
app.use(express.static('images'));

app.use(express.static('json'));
//Middleware
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated');
  } else {
    return next();
  }
};
//Strategia di passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = JSON.parse(fs.readFileSync('users.json')).users.find((user) => {
        return user.username === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password' })
      }
    }
  )
);

//Faccio la chiamata all'autenticazione
//login
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }
    req.login(user, err => {
      res.send("Logged in " + user.name);
    });
  })(req, res, next);
});

//logout
app.get("/api/logout", function (req, res) {
  req.logout();
  console.log("logged out");
  return res.send();
});

//ricavare i dati dell'utente loggato
app.get("/api/user", authMiddleware, (req, res) => {
  //console.log("Stai cercando un utente");
  let user = JSON.parse(fs.readFileSync('users.json')).users.find(user => {
    //console.log(user.name);
    return user.id === req.session.passport.user;
  })
  //console.log([user, req.session]);
  res.send({ user: user });
});

//Registrazione di un nuovo utente
app.post("/api/register", (req, res) => {
  //metto l'array di utenti letti da file in una variabile
  let data = JSON.parse(fs.readFileSync('users.json'));
  //creo un nuovo utente con i dati forniti
  let newUser = {
    id: data.users.length + 1,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };
  //aggiungo il nuovo utente all'oggetto
  data.users.push(newUser);
  //riscrivo su file
  fs.writeFileSync("users.json", JSON.stringify(data, null, 4));
  return res.send();
});

//Per inviare la storia come file JSON
app.get("/openStory", (req, res) => {
  console.log(req.body);
  let story = JSON.parse(fs.readFileSync(storiacorrente));
  res.send(story);
});

//per creare un file JSON storia con contenuto
app.post("/writeStory", (req, res) => {
  let data = JSON.stringify(req.body.filejson, null, 4);
  console.log(req.body.filejson.namestory);
  let nome = req.body.filejson.namestory;
  fs.writeFileSync("./" + nome + ".json", data);;
  res.send();
});

app.post("/immagineMeglio", upload.single('image'), (req, res) => {
  //console.log(req.file);
  res.json({
    file: req.file
  });
});

app.post("/deleteStory", (req, res) => {
  let nome = req.body.filejson;
  console.log(nome);
  fs.unlinkSync("./" + nome + ".json");;
  res.send();
});

app.post("/writeStoryList", (req, res) => {
  let data = JSON.stringify(req.body.filejson, null, 4);
  console.log(req.body);
  fs.writeFileSync("./StoryList.json", data);;
  res.send();
});

app.get("/prendiStoria", (req, res) => {
  console.log("arrivato");
  let sname = req.query.NAME;
  let storia = JSON.parse(fs.readFileSync("./" + sname + ".json"));
  res.send(storia);
});

app.get("/SendStory", (req, res) => {
  console.log(req.body);
  let storia = JSON.parse(fs.readFileSync('StoryList.json'));
  res.send(storia);
});

app.get("/immagineDaValutare", (req, res) => {
  console.log(req.body);
  res.send(toEval);
});

let toEval = {
  playerId: "",
  url: ""
}

app.post("/immagineRicevuta", upload.single('image'), (req, res) => {
  //console.log(req.file);
  toEval.url = req.file.filename;
  toEval.playerId = req.body.playerId;
  console.log(req.body.playerId);
  res.json({
    file: req.file
  });
});

app.get("/immagineDaValutare", (req, res) => {
  console.log(req.body);
  res.send(toEval);
});

//Serializzo e deserializzo l'utente acceduto per mantenerne la sessione
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  let user = JSON.parse(fs.readFileSync('users.json')).users.find((user) => {
    return user.id === id;
  })
  done(null, user);
});

//CHAT
const botName = "Robottino";
const chatServer = require("http").Server(app);
const io = require("socket.io")(chatServer, {
  cors: {
    origin: whitelist,
    methods: ["GET", "POST"],
    allowedHeaders: ["cors-header"],
    credentials: true,
  },
});
//oggetto contenente i giocatori
let giocatori = [];

//CHAT - SOCKET
io.on("connection", (chatSocket) => {
  console.log("Client connected, connection id: " + chatSocket.id);
  io.emit('welcome_message', {
    username: botName,
    text: "Un utente si è unito alla chat!"
  });

  //socket per indicare storia attuale
  chatSocket.on('caricastoria', (data) => {
    storiacorrente = data + ".json";
    console.log("ricevuto");
    console.log(storiacorrente);
  });


  //aggiornamente del punteggio tramite socket
  chatSocket.on('update_score', (data) => {
    if (giocatori.some(giocatoreGiusto => giocatoreGiusto.playerId === chatSocket.id)) {
      giocatori.forEach((giocatore) => {
        if (giocatore.playerId == chatSocket.id /*Se ha beccato il giocatore*/) {
          //Allora deve controllare se il giocatore contiene il gioco
          if (giocatore.punteggi[giocatore.punteggi.length - 1].nomeGioco == data.punteggi[0].nomeGioco) {
            giocatore.punteggi[giocatore.punteggi.length - 1].punti += data.punteggi[0].punti;
          } else {
            let newGame = {
              nomeGioco: data.punteggi[0].nomeGioco,
              punti: parseInt(data.punteggi[0].punti, 10),
              tempo: data.punteggi[0].tempo
            }
            //console.log(newGame);
            if (newGame.nomeGioco != '') giocatore.punteggi.push(newGame);
            //console.log(giocatore);
          }
        }
      });
    } else {
      let nuovoGiocatore = {
        playerId: chatSocket.id,
        nome: chatSocket.id,
        punteggi: [
          {
            nomeGioco: data.punteggi[0].nomeGioco,
            punti: data.punteggi[0].punti,
            tempo: data.punteggi[0].tempo
          }
        ]
      };
      //console.log(punteggioNuovoGioco);
      giocatori.push(nuovoGiocatore);
      //console.log(giocatori[0].punteggi);
    }
    io.emit('update_score', giocatori);
    io.emit('player_points', giocatori);
  });

  chatSocket.on('req_player_id', () => {
    chatSocket.emit('get_player_Id', chatSocket.id);
  });

  chatSocket.emit('get_player_Id', chatSocket.id);

  chatSocket.on('flush_arr', () => {
    giocatori = [];
  });
  chatSocket.on('get_player_points', () => {
    io.emit('player_points', giocatori);
  });

  chatSocket.on('image_eval', (data) => {
    io.emit('image_eval', data);
  });

  chatSocket.on('text_eval', (data) => {
    io.emit('text_eval', data);
  });


  chatSocket.on('image_sent', (data) => {
    io.emit('image_sent', data);
  });

  let stringsToDecode = [];
  chatSocket.on('strings_to_decode', (data) => {
    stringsToDecode = data;
    console.log(data)
  });

  io.emit('qr_code_game', stringsToDecode);

  chatSocket.on('rinomina_giocatore', (data) => {
    giocatori = data;
  });

  chatSocket.on('input_da_valutare', (data) => {
    io.emit('input_da_valutare', {
      playerId: data.playerId,
      tipo: data.tipo
    })
  });
  chatSocket.on('needs_help', (data) => {
    io.emit('needs_help', data);
  });

  chatSocket.on('gioco_testo', (data) => {
    io.emit('testo_da_valutare', data);
  })


  chatSocket.on('save_game', (data) => {
    fs.writeFileSync(__dirname + '/json/' + data.nome + ".json", JSON.stringify(data.giocatori, null, 4));
  });

  //messaggio inviato da giocatore
  chatSocket.on('player_message', (data) => {
    let user;
    for(var i = 0; i < giocatori.length; i++) {
      if(giocatori[i].playerId == chatSocket.id){ 
        user = giocatori[i].nome; 
      }
    }
    io.emit('send_admin', {
      username: user,
      text: data
    });
  });

  //Messaggio inviato da admin
  chatSocket.on('admin_message', (data) => {
    io.emit('send_player', {
      username: "Valutatore",
      text: data.message
    });
  });
  //evento disconnessione
  chatSocket.on('disconnect', () => {
    io.emit('user_disconnect', {
      username: botName,
      text: chatSocket.id + ' ha lasciato la chat'
    });
  });

});

chatServer.listen(3000, () => {
  console.log("player http server listening on port: 3000");
});

app.listen(3500, () => {
  console.log("listening on port 3500");
})

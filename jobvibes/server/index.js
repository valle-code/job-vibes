const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bycrypt = require('bcrypt'); 
const db = require('./db');

// app incialization
const app = express();
//middlewhere
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); 

app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
}));

app.use(cookieParser('keyboard cat')); 

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);


// Register page endpoint
app.post('/register', async (req, res) => {
  const username = req.body.username;
  console.log(username);
  const password = req.body.password;
  const email = req.body.email;
  console.log(password);
  const insertquery = "INSERT INTO `users` (`email`, `username`, `password`) VALUES (?, ?, ?)";
  const selectquery = "SELECT * FROM `users` WHERE username = ?";
  db.query(selectquery, [username], async (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send('El usuario ya existe con nombre ' + username + ' ya existe');
    } else {
      const hashedPassword = await bycrypt.hash(password, 10);
      db.query(insertquery, [email, username, hashedPassword], (err, rows) => {
        if (err) throw err;
        res.send('Usuario registrado con exito');
      })
    }
  })
});

// Login page endpoint  
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { 
    if (err) {console.log(err);}
    if (!user) {res.send("User no encontrado");}
    if (user) {
      
      req.login(user, (err) => {
        if (err) {console.log(err);}
        res.send("Usuario logeado");
        console.log(user);
      })
    }
  })(req, res, next); 
})

app.get('/getUser', (req, res) => {
  res.send(req.user);
})

// start server 
app.listen(3001, () => {console.log('Server started on port 3001')});
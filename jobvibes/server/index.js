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

app.post('/addUser', async (req, res) => {
  const username = req.body.username;
  console.log(username);
  const password = req.body.password;
  const email = req.body.email;
  const userRole = req.body.adminRole;
  console.log(password);
  

  const insertquery = "INSERT INTO `users` (`email`, `username`, `password`, `adminRole`) VALUES (?, ?, ?, 1)";
  
  
  const selectquery = "SELECT * FROM `users` WHERE username = ?";

  db.query(selectquery, [username], async (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send('El usuario ya existe con nombre ' + username + ' ya existe');
    } else {
      const hashedPassword = await bycrypt.hash(password, 10);
      if (userRole === "Administrador") {
        db.query(insertquery, [email, username, hashedPassword, 1], (err, rows) => {
          if (err) throw err;
          res.send('Usuario registrado con exito');
        })
      } else {
        
          db.query(insertquery, [email, username, hashedPassword, 0], (err, rows) => {
            if (err) throw err;
            res.send('Usuario registrado con exito');
          })
      }
    }
  })
});

// Login page endpoint  
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      res.status(401).send("Usuario no encontrado");
      return;
    }

    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      // Almacenar el usuario completo en la sesión, incluyendo la contraseña
      const { username, password } = user;
      req.session.user = { username, password };

      // Establecer la cookie de sesión
      const sessionId = req.sessionID;
      res.cookie('sessionId', sessionId, { httpOnly: true });
      res.send('Usuario logueado con exito');
    });
  })(req, res, next);
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    } else {
      res.clearCookie('sessionID');
      res.status(200).send('Se cerró sesión correctamente');
    }
  });
});

// Post Job offer endpoint
app.post('/joboffers', (req, res) => {
  const jobDetails = req.body.jobDetails;
  const insertquery = "INSERT INTO `jobpost` (`jobDetails`) VALUES (?)";
  db.query(insertquery, [jobDetails], (err, rows) => {
    if (err) throw err;
    res.send('Oferta de trabajo publicada con exito');
  })
});

// HTTP GET method endpoints
app.get('/getJobOffer', (req, res) => {
  const selectquery = "SELECT * FROM `jobpost` ORDER BY `creationDate` DESC;";
  db.query(selectquery, (err, rows) => {
    if (err) {
      console.error('Error en la ejecución de la consulta, SELECT * FROM `jobpost`: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (rows.length === 0) {
      res.send([]);
      return;
    }

    const jobOfferData = rows.map(row => ({
      jobDetails: row.jobDetails,
      creationDate: row.creationDate
    }));

    res.send(jobOfferData);
  });
});



app.get('/getUser', (req, res) => {
  if (req.user) {
    const {id, username, password, userRole, adminRole, bannedRole} = req.user;
    res.send({ id, username, password, userRole, adminRole, bannedRole});
  } else {
    res.send(null);
  }
});

app.get('/getUsers', (req, res) => {
  const selectquery = "SELECT * FROM `users`";
  db.query(selectquery, (err, rows) => {

    if (err) {
      console.error('Error en la ejecución de la consulta, SELECT * FROM `users`: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (rows.length === 0) {
      res.send([]);
      return;
    }

    const userData = rows.map(row => ({
      id: row.id,
      email: row.email,
      username: row.username,
      password: row.password,
      userRole: row.userRole,
      adminRole: row.adminRole,
      bannedRole: row.bannedRole
    }));

    res.send(userData);
  });
});

app.delete('/deleteUser/:id', (req, res) => {
  const userId = req.params.id;
  const deletequery = "DELETE FROM `users` WHERE id = ?";

  db.query(deletequery, [userId], (err, result) => {
    if (err) {
      console.error('Error en la eliminación del usuario con id ' + userId + ': ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (result.affectedRows === 0) {
      res.send('El usuario con id ' + userId + ' no existe');
      return;
    }

    res.send('Usuario con id ' + userId + ' eliminado exitosamente');
  });
});

app.put('/banUser/:id', (req, res) => {
  const userId = req.params.id;
  const selectQuery = "SELECT * FROM `users` WHERE id = ?";
  
  db.query(selectQuery, [userId], (err, rows) => {
    if (err) {
      console.error('Error en la ejecución de la consulta, SELECT * FROM `users`: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (rows.length === 0) {
      res.send('El usuario con id ' + userId + ' no existe');
      return;
    }

    const user = rows[0];
    const isBanned = user.bannedRole;

    const updateQuery = "UPDATE `users` SET bannedRole = ? WHERE id = ?";
    db.query(updateQuery, [!isBanned, userId], (err, result) => {
      if (err) {
        console.error('Error en la ejecución de la consulta, UPDATE `users` SET bannedRole: ', err);
        res.status(500).send('Error executing query');
        return;
      }

      if (result.affectedRows === 0) {
        res.send('El usuario con id ' + userId + ' no existe');
        return;
      }

      const action = isBanned ? 'desbanneado' : 'baneado';
      res.send('El usuario con id ' + userId + ' ha sido ' + action);
    });
  });
});

app.get('/searchUser/:username', (req, res) => {
  const username = req.params.username;
  const selectQuery = "SELECT * FROM `users` WHERE username LIKE ?";

  db.query(selectQuery, ['%' + username + '%'], (err, rows) => {
    if (err) {
      console.error('Error en la ejecución de la consulta, SELECT * FROM `users`: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (rows.length === 0) {
      res.send([]);
      return;
    }

    const userData = rows.map(row => ({
      id: row.id,
      email: row.email,
      username: row.username,
      password: row.password,
      userRole: row.userRole,
      adminRole: row.adminRole,
      bannedRole: row.bannedRole
    }));

    res.send(userData);
  });
});











// start server 
app.listen(3001, () => { console.log('Server started on port 3001') });
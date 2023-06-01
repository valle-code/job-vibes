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


app.post('/register', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const insertquery = "INSERT INTO `users` (`email`, `username`, `password`) VALUES (?, ?, ?)";
    const selectquery = "SELECT * FROM `users` WHERE username = ?";

    db.query(selectquery, [username], async (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send('El usuario ' + username + ' ya existe');
      } else {
        const hashedPassword = await bycrypt.hash(password, 10);
        db.query(insertquery, [email, username, hashedPassword], (err, rows) => {
          if (err) {
            throw err;
          }
          res.send('Usuario registrado con éxito');
        });
      }
    });
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});


app.post('/addUser', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const userRole = req.body.adminRole;

    const insertquery = "INSERT INTO `users` (`email`, `username`, `password`, `adminRole`) VALUES (?, ?, ?, ?)";

    const selectquery = "SELECT * FROM `users` WHERE username = ?";

    db.query(selectquery, [username], async (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send('El usuario ' + username + ' ya existe');
      } else {
        const hashedPassword = await bycrypt.hash(password, 10);
        let adminRoleValue = 0;
        if (userRole === "Administrador") {
          adminRoleValue = 1;
        }

        db.query(insertquery, [email, username, hashedPassword, adminRoleValue], (err, rows) => {
          if (err) {
            throw err;
          }
          res.send('Usuario registrado con éxito');
        });
      }
    });
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});


app.post('/login', async (req, res, next) => {
  try {
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

        if (req.user.bannedRole == 1) {
          res.status(403).send("Este usuario está baneado");
          return;
        }

        // Almacenar el usuario completo en la sesión, incluyendo la contraseña
        const { username, password } = user;
        req.session.user = { username, password };

        // Establecer la cookie de sesión
        const sessionId = req.sessionID;
        res.cookie('sessionId', sessionId, { httpOnly: true });
        res.send('Usuario logueado con éxito');
      });
    })(req, res, next);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
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

app.post('/joboffers', (req, res) => {
  try {
    const jobTitle = req.body.jobTitle;
    const jobDescription = req.body.jobDescription;
    const jobThumbnail = req.body.jobThumbnail;
    const jobDetails = req.body.jobDetails;
    const images = req.body.jobImages;

    const insertquery = "INSERT INTO `jobpost` (`title`, `description`, `thumbnail`, `jobDetails`) VALUES (?, ?, ?, ?)";
    db.query(insertquery, [jobTitle, jobDescription, jobThumbnail, jobDetails], (err, rows) => {
      if (err) throw err;

      const selectquery = "SELECT id FROM `jobpost` ORDER BY id DESC LIMIT 1";
      db.query(selectquery, (err, rows) => {
        if (err) throw err;

        const id_post = rows[0].id;
        for (let i = 0; i < images.length; i++) {
          const insertImageQuery = "INSERT INTO `images` (`url`, `id_post`) VALUES (?, ?)";
          db.query(insertImageQuery, [images[i], id_post], (err, rows) => {
            if (err) throw err;
            console.log(`Imagen ${i + 1} insertada con éxito`);
          });
        }
        res.send('Oferta de trabajo publicada con éxito');
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al publicar la oferta de trabajo');
  }
});


app.get('/getJobOffer', (req, res) => {
  const selectquery = "SELECT * FROM `jobpost` ORDER BY `creationDate` DESC;";
  db.query(selectquery, (err, rows) => {
    if (err) {
      console.error('Error en la ejecución de la consulta, SELECT * FROM `jobpost`: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    try {
      if (rows.length === 0) {
        res.send([]);
        return;
      }

      const jobOfferData = rows.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        thumbnail: row.thumbnail,
        jobDetails: row.jobDetails,
        creationDate: row.creationDate
      }));

      res.send(jobOfferData);
    } catch (err) {
      console.error('Error al mostrar las ofertas de trabajo', err);
      res.status(500).send('Error processing job offer data');
    }
  });
});


app.get('/getJobOffer/:id', (req, res) => {
  const jobId = req.params.id;
  const sqlQuery = "SELECT jobpost.id, title, description, thumbnail, jobDetails, creationDate, images.id as image_id, url FROM `jobpost` INNER JOIN `images`ON jobpost.id = images.id_post WHERE jobpost.id = ?;";
  db.query(sqlQuery, [jobId], (err, result) => {
    if (err) {
      console.error('Error en la ejecución de la consulta, SELECT jobpost.id, title, description, thumbnail, jobDetails, creationDate, images.id as image_id, url FROM `jobpost` INNER JOIN `images`ON jobpost.id = images.id_post WHERE jobpost.id = ?: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    try {
      if (result.length === 0) {
        res.send(null);
        return;
      }

      const jobOfferData = {
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
        thumbnail: result[0].thumbnail,
        jobDetails: result[0].jobDetails,
        creationDate: result[0].creationDate,
        images: result.map(row => ({
          image_id: row.image_id,
          url: row.url
        }))
      };

      console.log(jobOfferData);

      res.send(jobOfferData);
    } catch (err) {
      console.error('Error al mostrar las ofertas de trabajo', err);
      res.status(500).send('Error interno del servidor');
    }
  });
});


app.post('/postComment', (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.body.userId;
    const comment = req.body.content;

    if (!userId) {
      res.status(400).send('Se necesita un usuario para publicar un comentario');
      return;
    }

    const insertquery = "INSERT INTO `comments` (`content`, `id_user`, `id_post`) VALUES (?, ?, ?)";
    db.query(insertquery, [comment, userId, postId], (err, rows) => {
      if (err) throw err;
      res.send('Comentario publicado con éxito');
    });
  } catch (err) {
    console.error('Error al publicar el comentario:', err);
    res.status(500).send('Error al publicar el comentario');
  }
});


app.get('/getJobComments/:id', (req, res) => {
  try {
    const postId = req.params.id;
    const sqlQuery = "SELECT users.*, comments.* FROM users INNER JOIN comments ON users.id = comments.id_user WHERE comments.id_post = ?;";
    db.query(sqlQuery, [postId], (err, result) => {
      if (err) {
        console.error('Error en la ejecución de la consulta, SELECT users.*, comments.* FROM users INNER JOIN comments ON users.id = comments.id_user WHERE comments.id_post = ?;', err);
        res.status(500).send('Error executing query');
        return;
      }

      if (result.length === 0) {
        res.send(null);
        return;
      }

      const commentsData = result.map(row => ({
        user: row.username,
        role: row.adminRole,
        comment: row.content,
        creationDate: row.creationDate
      }));

      console.log(commentsData);

      res.send(commentsData);
    });
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    res.status(500).send('Error al obtener los comentarios');
  }
});


app.get('/getUser', (req, res) => {
  try {
    if (req.user) {
      const { id, username, password, userRole, adminRole, bannedRole } = req.user;
      res.send({ id, username, password, userRole, adminRole, bannedRole });
    } else {
      res.send(null);
    }
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    res.status(500).send('Error al obtener el usuario');
  }
});


app.get('/getUsers', (req, res) => {
  try {
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
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).send('Error al obtener los usuarios');
  }
});

app.delete('/deleteUser/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const deletequery = "DELETE FROM `users` WHERE id = ?";

    db.query(deletequery, [userId], (err, result) => {
      if (err) {
        console.error('Error en la eliminación del usuario con id ' + userId + ': ', err);
        res.status(500).send('Error executing query');
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send('El usuario con id ' + userId + ' no existe');
        return;
      }

      res.send('Usuario con id ' + userId + ' eliminado exitosamente');
    });
  } catch (err) {
    console.error('Error al eliminar el usuario:', err);
    res.status(500).send('Error al eliminar el usuario');
  }
});



app.put('/banUser/:id', (req, res) => {
  try {
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
  } catch (err) {
    console.error('Error al banear/desbanear al usuario:', err);
    res.status(500).send('Error al banear/desbanear al usuario');
  }
});


app.get('/searchUser/:username', (req, res) => {
  try {
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
  } catch (err) {
    console.error('Error al buscar usuarios:', err);
    res.status(500).send('Error al buscar usuarios');
  }
});

app.post('/recoverPsw', async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const newPassword = req.body.password;
    const hashedPassword = await bycrypt.hash(newPassword, 10);
    const selectQuery = "SELECT * FROM `users` WHERE username = ? AND email = ?";

    db.query(selectQuery, [username, email], (err, rows) => {
      if (err) {
        console.error('Error en la ejecución de la consulta, SELECT * FROM `users`: ', err);
        res.status(500).send('Error executing query');
        return;
      }

      if (rows.length === 0) {
        res.status(404).send('El usuario con nombre de usuario ' + username + ' y email ' + email + ' no existe');
        return;
      }

      const user = rows[0];

      const updateQuery = "UPDATE `users` SET password = ? WHERE id = ?";

      db.query(updateQuery, [hashedPassword, user.id], (err, result) => {
        if (err) {
          console.error('Error en la ejecución de la consulta, UPDATE `users` SET password: ', err);
          res.status(500).send('Error executing query');
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).send('El usuario con nombre de usuario ' + username + ' y email ' + email + ' no existe');
          return;
        }

        res.status(200).send('Contraseña cambiada con éxito');
      });
    });
  } catch (err) {
    console.error('Error al recuperar la contraseña:', err);
    res.status(500).send('Error al recuperar la contraseña');
  }
});


app.post('/sendReport', (req, res) => {
  try {
    const idPost = req.body.idPost;
    const title = req.body.title;
    const description = req.body.description;
    const insertQuery = "INSERT INTO `reports` (idPost, titleReport, descriptionReport) VALUES (?, ?, ?)";

    db.query(insertQuery, [idPost, title, description], (err, result) => {
      if (err) {
        console.error('Error en la ejecución de la consulta, INSERT INTO `reports`: ', err);
        res.status(500).send('Error executing query');
        return;
      }

      res.status(200).send('Reporte enviado con éxito');
    });
  } catch (err) {
    console.error('Error al enviar el reporte:', err);
    res.status(500).send('Error al enviar el reporte');
  }
});


app.get('/getReports', (req, res) => {
  try {
    const selectQuery = "SELECT * FROM `reports` INNER JOIN jobpost ON reports.idPost = jobpost.id";

    db.query(selectQuery, (err, rows) => {
      if (err) {
        console.error('Error en la ejecución de la consulta, SELECT * FROM `reports`: ', err);
        res.status(500).send('Error executing query');
        return;
      }

      if (rows.length === 0) {
        res.send([]);
        return;
      }

      const reportsData = rows.map(row => ({
        id: row.idReport,
        idPost: row.idPost,
        titleReport: row.titleReport,
        descriptionReport: row.descriptionReport,
        creationDateReport: row.creationDateReport,
        idJobPost: row.id,
        titleJobPost: row.title,
        descriptionJobPost: row.description,
        thumbnailJobPost: row.thumbnail,
        creationDateJobPost: row.creationDate,
        jobDetailsJobPost: row.jobDetails,
        creationDateJobPost: row.creationDate,
      }));

      res.send(reportsData);
    });
  } catch (err) {
    console.error('Error al obtener los reportes:', err);
    res.status(500).send('Error al obtener los reportes');
  }
});

app.delete('/deleteJobpost/:id', (req, res) => {
  try {
    const reportId = req.params.id;
    const deleteQuery = "DELETE FROM `jobpost` WHERE id = ?";

    db.query(deleteQuery, [reportId], (err, result) => {
      if (err) {
        console.error('Error en la ejecución de la consulta, DELETE FROM `jobpost`: ', err);
        res.status(500).send('Error executing query');
        return;
      }

      if (result.affectedRows === 0) {
        res.send('El reporte con id ' + reportId + ' no existe');
        return;
      }

      res.send('El reporte con id ' + reportId + ' ha sido eliminado');
    });
  } catch (err) {
    console.error('Error al eliminar el reporte:', err);
    res.status(500).send('Error al eliminar el reporte');
  }
});







// start server 
app.listen(3001, () => { console.log('Server started on port 3001') });
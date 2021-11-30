const User = require('./auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
  const newUser = {
    username: req.body.name,
    userlastname: req.body.lastname,
    useremail: req.body.email,
    userpassword: bcrypt.hashSync(req.body.password),
    userphonenumber: req.body.phonenumber,
    useridrole: req.body.role

  }

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000) return res.status(409).send('Email already exists');
    if (err) return res.status(500).send('Server error');
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataUser = {
      username: user.username,
      useremail: user.useremail,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response 
    res.send({ dataUser });
  });
}

exports.loginUser = (req, res, next) => {
  const userData = {
    useremail: req.body.useremail,
    userpassword: req.body.userpassword
  }
  User.findOne({ useremail: userData.useremail }, (err, user) => {
    if (err) return res.status(500).send('Server error!');

    if (!user) {
      // email does not exist
      res.status(409).send({ message: 'Something is wrong' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.userpassword, user.userpassword);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataUser = {
          username: user.username,
          useremail: user.useremail,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({ dataUser });
      } else {
        // password wrong
        res.status(409).send({ message: 'Something is wrong' });
      }
    }
  });
}
import jwt from 'jsonwebtoken';

import { secretKey } from 'server/configs';

import User from 'server/models/user';

// const admin = {
//   id: 1,
//   username: 'admin',
//   password: 'admin',
//   name: 'Suranart Niamcome',
//   avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg'
// };

function generateToken(user) {
  const token = jwt.sign({
    sub: user.id,
    iat: new Date().getTime()
  }, secretKey);
  return token;
}

export function signup(req, res, next) {
  const { username, password } = req.body;

  if (! username || ! password) {
    return res.status(422)
      .json({
        message: 'You must provide username and password'
      });
  }

  User.findOne({username: username}, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      console.log(existingUser);
      res.status(422).json({ error: 'Email is in use' });
    }

    const user = new User({
      username: username,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      const token = generateToken(user);
      // res.json(user);
      // res.json({ success: true });
      res.json({ token });
    });

  });
}

export function login(req, res, next) {
  const { username, password } = req.body;

  if (! username || ! password) {
    return res.status(400)
      .json({
        message: 'You must provide username and password'
      });
  }

  if (username == admin.username && password == admin.password) {
    const user = { ...admin };
    delete user.username;
    delete user.password;

    const token = jwt.sign(user, secretKey);
    
    return res.json({token});
  }

  return res.status(401)
    .json({
      message: 'Your username or password incorrect'
    });
}
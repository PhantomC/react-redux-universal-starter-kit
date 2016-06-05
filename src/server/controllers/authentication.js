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

export function generateToken(user) {
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
      res.json({ token });
    });

  });
}

export function login(req, res, next) {
  res.json({ token: generateToken(req.user) });
}
import jwt from 'jsonwebtoken';

import { secretKey } from 'server/configs';

const admin = {
  id: 1,
  username: 'admin',
  password: 'admin',
  name: 'Suranart Niamcome',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg'
};

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
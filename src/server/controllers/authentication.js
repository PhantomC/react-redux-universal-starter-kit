import faker from 'faker';
import jwt from 'jsonwebtoken';

const secretKey = 'your secret key';

const fakerAdmin = {
  id: 1,
  username: 'admin',
  password: 'admin',
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar()
};

export function login(req, res, next) {
  const { username, password } = req.body;

  if (! username || ! password) {
    return res.status(400)
      .json({
        message: 'You must provide username and password'
      });
  }

  if (username == fakerAdmin.username && password == fakerAdmin.password) {
    const user = { ...fakerAdmin };
    delete user.password;

    const token = jwt.sign(user, secretKey);
    
    return res.json({token});
  }

  return res.status(401)
    .json({
      message: 'Your username or password incorrect'
    });
}
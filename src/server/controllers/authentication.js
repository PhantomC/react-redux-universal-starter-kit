import faker from 'faker';
import jwt from 'jsonwebtoken';

const secretKey = 'your secret key';

const fakerAdmin = {
  id: 1,
  username: 'admin',
  password: 'admin',
  email: faker.internet.email(),
  profile_pic: faker.image.avatar()
};

export function login(req, res, next) {
	const { username, password } = req.body;

  if (! username || ! password) {
    return res.status(400)
      .json({
        error: 'You must provide username and password'
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
      error: 'Your username or password incorrect'
    });
}
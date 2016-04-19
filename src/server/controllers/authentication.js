export function login(req, res) {
	const { username, password } = req.body;

  if (! username || ! password) {
    return res.status(400)
      .json({
        error: 'You must provide username and password'
      });
  } 

  if (username == 'admin' && password == 'admin') {
    const token = 'this is a token';
	  return res.json({token});
	}

  return res.status(401)
    .json({
      error: 'Your username or password incorrect'
    });
}
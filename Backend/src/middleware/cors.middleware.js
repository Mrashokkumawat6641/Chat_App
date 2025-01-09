const corsMiddleware = (req, res, next) => {

  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,HEAD,DELETE,PATCH,OPTIONS');

  res.header(
      'Access-Control-Allow-Headers',
      'Origin, Accept, X-Requested-With, Content-Type, Cache-Control, Authorization'
  );

  res.header('Access-Control-Expose-Headers', 'Authorization');

  if (req.method === 'OPTIONS') {
      return res.sendStatus(204); 
  }
  next();
};

export { corsMiddleware };

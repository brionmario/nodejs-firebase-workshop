const isValidAccessToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const type = authorizationHeader?.split(' ')[0];
  const token = authorizationHeader?.split(' ')[1];

  // TODO: DO NOT USE IN PRODUCTION.
  // Use a service like Asgardeo to introspect the token.
  if (type === 'Bearer' && token === 'IDEALIZE') {
    next();
  } else {
    res.status(401).json({
      message: `You are not authorized.`,
    });
  }
};

module.exports = {
  isValidAccessToken,
};

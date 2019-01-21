const jwt = require('jsonwebtoken');

const generateCredentials = (context) => {
  const { user, APP_SECRET } = context;
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  
  return {
    user,
    token
  };
};

const resolveUserId = context => {
  const authorization = context.request.get('Authorization')

  if (authorization) {
    const token = authorization.replace('Bearer ', '').trim();
    const { userId } = jwt.verify(token, context.APP_SECRET);
    return userId;
  }
};

module.exports = {
  generateCredentials,
  resolveUserId
}
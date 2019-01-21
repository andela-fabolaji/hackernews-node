const bcrypt = require('bcryptjs');
const { generateCredentials, resolveUserId } = require('../utils');

const post = async (parent, args, context) => {
  const userId = resolveUserId(context);
  
  if (userId) {
    const { url, description } = args;
    return await context.prisma.createLink({
      url,
      description,
      postedBy: {
        connect: {
          id: userId
        }
      }
    });
  }
}

const update = async (parent, args, context) => {
  const { id, data } = args;
  return await context.prisma.updateLink({
    data: { ...data },
    where: { id }
  });
}

const remove = async (parent, args, context) => {
  return await context.prisma.deleteLink({ id: args.id });
}

const signup = async (parent, args, context) => {
  const { prisma, APP_SECRET } = context;
  const password = await bcrypt.hash(args.password, await bcrypt.genSalt(10));
  const newUser = await prisma.createUser({ ...args, password });
  context.user = newUser;
  
  const authPayload = generateCredentials(context);
  return authPayload;
}

const login = async (parent, args, context) => {
  const { prisma, APP_SECRET } = context;
  
  const user = await prisma.user({ id: args.id });
  if (!user) throw new Error('User not found');

  const isUserValid = await bcrypt.compare(args.password, user.password);
  if (!isUserValid) throw new Error('Incorrect login details');
  
  context.user = user;

  const authPayload = generateCredentials(context);
  return authPayload;
}

module.exports = {
  post,
  update,
  remove,
  signup,
  login
};
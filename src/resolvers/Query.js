const { resolveUserId } = require('../utils');
const feed = async (parent, args, context) => await context.prisma.links();

const allUsers = async (parent, args, context) => {
  const userId = resolveUserId(context);
  if (userId) {
    return await context.prisma.users();
  }
}

module.exports = {
  feed,
  allUsers
};
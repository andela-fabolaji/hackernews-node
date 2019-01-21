// resolver function for resolving Link on User model
const links = (parent, args, context) => {
  return context.prisma.users({ id: parent.id }).links();
};

module.exports = {
  links
};
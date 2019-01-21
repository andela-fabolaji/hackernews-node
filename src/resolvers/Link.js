// resolver function for postedBy on links
const postedBy = (parent, args, context) => {
  return context.prisma.links({ id: parent.id }).postedBy();
};

module.exports = {
  postedBy
}
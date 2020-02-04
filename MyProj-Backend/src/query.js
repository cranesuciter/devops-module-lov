module.exports = {
  users(root, args, context) {
    return context.prisma.users();
  },
};

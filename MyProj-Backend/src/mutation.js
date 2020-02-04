module.exports = {
  createUser(root, args, context) {
    return context.prisma.createUser({
      name: args.name,
    });
  },
};

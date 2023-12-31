const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
              }
         throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user){
                throw new AuthenticationError('Incorrect email or password');
            };

            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword) {
                throw new AuthenticationError('Incorrect email or password');
            };
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw Authenticationerror('You need to be logged in!');
        },
        
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull:  { savedBooks: { bookId }}},
                    { new: true }
              );
              return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    }, 
};

module.exports = resolvers;
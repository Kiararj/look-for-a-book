const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
         if(context.user) {
            return await User.findOne({ _id: context.user._id }).populate('savedBooks');
         }
         throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, {email, password }) => {
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

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user_id },
                    { $addToSet: { savedBooks: args.input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw newAuthenticationerror('You need to be logged in!');
        },
        
        removeBook: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    }, 
};

module.exports = resolvers;
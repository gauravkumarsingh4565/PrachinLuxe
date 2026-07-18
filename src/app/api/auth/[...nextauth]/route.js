import NextAuthImport from 'next-auth';
import GoogleProviderImport from 'next-auth/providers/google';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const NextAuth = NextAuthImport.default || NextAuthImport;
const GoogleProvider = GoogleProviderImport.default || GoogleProviderImport;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          await dbConnect();
          const email = profile.email || user.email;
          if (!email) {
            console.error('Sign-in failed: No email provided by Google profile.');
            return false;
          }

          let dbUser = await User.findOne({ email: email.toLowerCase() });
          const isNewUser = !dbUser;

          if (!dbUser) {
            dbUser = await User.create({
              name: profile.name || user.name || 'Google User',
              email: email.toLowerCase(),
              image: profile.picture || user.image || '',
              phoneNumber: '',
              isOnboarded: false,
              role: 'NORMALUSER',
            });
          } else {
            console.log('\n♻️  EXISTING USER — Found in Database:');
          }

          console.log('📂 Database User Record:');
          console.log(JSON.stringify({
            _id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            phoneNumber: dbUser.phoneNumber,
            isOnboarded: dbUser.isOnboarded,
            role: dbUser.role,
            createdAt: dbUser.createdAt,
          }, null, 2));
          console.log('   isNewUser:', isNewUser);
          console.log('========================================\n');

          // Attach fields to the user object, which passes them to the jwt callback
          user.id = dbUser._id.toString();
          user.isOnboarded = dbUser.isOnboarded;
          user.phoneNumber = dbUser.phoneNumber || '';
          user.role = dbUser.role || 'NORMALUSER';
          user.name = dbUser.name;
          return true;
        } catch (error) {
          console.error('💥 Error in Google sign-in callback:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // On initial sign-in, NextAuth passes the 'user' returned from signIn
      if (user) {
        token.id = user.id;
        token.isOnboarded = user.isOnboarded;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role || 'NORMALUSER';
      }

      // Handle session updates (dynamic refresh after onboarding)
      if (trigger === 'update' && session) {
        try {
          await dbConnect();
          const dbUser = await User.findById(token.id);
          if (dbUser) {
            token.isOnboarded = dbUser.isOnboarded;
            token.phoneNumber = dbUser.phoneNumber || '';
            token.role = dbUser.role || 'NORMALUSER';
            token.name = dbUser.name;
          } else {
            // Fallback if user is not found in database
            if (session.isOnboarded !== undefined) {
              token.isOnboarded = session.isOnboarded;
            }
            if (session.phoneNumber !== undefined) {
              token.phoneNumber = session.phoneNumber;
            }
            if (session.name !== undefined) {
              token.name = session.name;
            }
            if (session.role !== undefined) {
              token.role = session.role;
            }
          }
        } catch (error) {
          console.error('Error refreshing token state from database:', error);
          // Fallback to session payload
          if (session.isOnboarded !== undefined) {
            token.isOnboarded = session.isOnboarded;
          }
          if (session.phoneNumber !== undefined) {
            token.phoneNumber = session.phoneNumber;
          }
          if (session.name !== undefined) {
            token.name = session.name;
          }
          if (session.role !== undefined) {
            token.role = session.role;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.isOnboarded = token.isOnboarded;
        session.user.phoneNumber = token.phoneNumber;
        session.user.role = token.role || 'NORMALUSER';
        session.user.name = token.name || session.user.name;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

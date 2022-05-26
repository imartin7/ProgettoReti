import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import cookie         from 'react-cookies';
import _get           from 'lodash/get';

require('dotenv').config()

export default NextAuth({
  // OAuth authentication provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const isAllowedToSignIn = true

      if (isAllowedToSignIn) {
        const token = _get(account, 'id_token');
        const { id, name, email, image } = user;
        cookie.save('token', token, { path: '/' });
        setUser({
          id,name,email,image,token
        })
        return true
      } else {
        return '/account/login'
      }
    }
  }
});
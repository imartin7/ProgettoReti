import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import _get           from 'lodash/get';
import { setCookie }  from 'nookies'
import { setUserData }from '../../../store/actions/user/base'
import { store } from '../../../store/store'

export default NextAuth({
  // OAuth authentication provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: process.env.AUTH_URL,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        const token = _get(account, 'id_token');
        const { id, name, email, image } = user;
        setCookie(null,'token', token, { path: '/' });
        await store.dispatch(setUserData({
          id,
          name,
          email,
          image,
          token,
          username: email,
          lastname: ''
        }));
        return true
      } else {
        return '/account/login'
      }
    }
  }
});
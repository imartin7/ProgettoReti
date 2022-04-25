import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
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
  jwt: {
    encryption: true
  },
  /* callbacks: {
    jwt: async ({ token, user }) => {
        user && (token.user = user)
        console.log("JWT", token, user)
        return token
    },
    session: async ({ session, token }) => {
        session.user = token.user
        console.log("SESSION",session, token)
        return session
    }
  }, */
  database: process.env.DATABASE_URL
})
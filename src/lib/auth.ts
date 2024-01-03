import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import crypto from 'crypto'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import type { Adapter } from 'next-auth/adapters'
import { ROLES } from '@/constants/roles'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const userCredentials = {
          email: credentials?.email,
          password: credentials?.password,
        }
        if (!userCredentials.email || !userCredentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: userCredentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
          },
        })
        // console.log('user', user)

        const hashedPassword = crypto.createHash('sha256').update(userCredentials.password).digest('base64')
        if (user && user.password === hashedPassword) {
          const { password, ...rest } = user
          return rest
        } else {
          return null
        }
      },
    }),
  ],

  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub ?? ''
      session.user.role = token.role as keyof typeof ROLES

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role
      }
      return await token
    },
  },
} satisfies AuthOptions

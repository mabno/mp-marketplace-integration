import { ROLES } from '@/constants/roles'
import NextAuth, { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string
    role: keyof typeof ROLES
  }

  interface Session {
    user: User
  }
}

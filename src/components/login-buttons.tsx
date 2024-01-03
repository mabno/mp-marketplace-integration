'use client'
import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginButtons({ session }: { session: Session | null }) {
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

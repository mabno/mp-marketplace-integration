import LoginButtons from '@/components/login-buttons'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <LoginButtons session={session} />
    </main>
  )
}

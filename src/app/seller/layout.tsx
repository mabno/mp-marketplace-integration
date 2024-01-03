import { ROLES } from '@/constants/roles'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== ROLES.SELLER) {
    return <main>Not authorized</main>
  }

  return <main className='flex flex-col items-center justify-between p-24'>{children}</main>
}

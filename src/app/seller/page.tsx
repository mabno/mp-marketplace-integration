import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Page() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    return <div>Not authorized</div>
  }

  const mercadopagoSellerRequest = await prisma.mercadopagoSellerLink.upsert({
    where: {
      userId,
    },
    update: {},
    create: {
      userId,
    },
  })

  const clientId = process.env.MP_CLIENT_ID
  const redirectUri = process.env.MP_REDIRECT_URI
  const id = mercadopagoSellerRequest.id
  const url = `https://auth.mercadopago.com.ar/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${id}&redirect_uri=${redirectUri}`

  return (
    <div>
      <h1 className='text-3xl mb-4'>Empeza a vender</h1>
      <p className='mb-2'>Para empezar a vender, primero tenes que vincular tu cuenta de Mercadopago</p>
      <Link href={url} className='block p-4 bg-[#4287F5] font-bold uppercase'>
        Vincular 😁
      </Link>
    </div>
  )
}

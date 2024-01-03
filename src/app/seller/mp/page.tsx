import { prisma } from '@/lib/prisma'
import Link from 'next/link'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page0({ searchParams }: PageProps) {
  const { code, state } = searchParams

  if (!code || !state) {
    return <div>Error return uri</div>
  }

  const response = await fetch('https://api.mercadopago.com/oauth/token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: process.env.MP_CLIENT_ID as string,
      client_secret: process.env.MP_CLIENT_SECRET as string,
      grant_type: 'authorization_code',
      code: code as string,
      redirect_uri: process.env.MP_REDIRECT_URI as string,
    }),
  })
  const json = await response.json()
  if (!response.ok) {
    return (
      <div>
        <h1>Error</h1>
        <p>{json.error}</p>
        <p>{json.message}</p>
      </div>
    )
  }

  await prisma.mercadopagoSellerLink.update({
    where: {
      id: state as string,
    },
    data: {
      accessToken: json.access_token,
      refreshToken: json.refresh_token,
    },
  })
  return (
    <div>
      <h1 className='mb-2'>Cuenta de MercadoPago vinculada 🤑</h1>
      <Link href='/'>Volver</Link>
    </div>
  )
}

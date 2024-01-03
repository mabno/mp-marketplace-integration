import React from 'react'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import Checkout from '@/components/checkout'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Page({ searchParams }: { searchParams: any }) {
  const { sellerId } = searchParams
  const seller = await prisma.user.findUnique({
    where: {
      id: sellerId,
    },
    include: {
      mercadopagoSellerLink: true,
    },
  })

  if (!seller?.mercadopagoSellerLink?.accessToken) {
    throw new Error('El vendedor no tiene un access token de MercadoPago')
  }
  console.log(seller)

  const client = new MercadoPagoConfig({ accessToken: seller.mercadopagoSellerLink.accessToken })

  const preference = new Preference(client)

  const preferenceResponse = await preference.create({
    body: {
      items: [
        {
          id: 'ID PRUEBA',
          title: 'Producto de prueba',
          quantity: 1,
          unit_price: 100,
        },
      ],
    },
  })

  if (!preferenceResponse.id) {
    throw new Error('No se pudo crear la preferencia')
  }

  console.log(preferenceResponse)
  return (
    <div>
      <a href={preferenceResponse.sandbox_init_point} target='_blank'>
        Pagar
      </a>
    </div>
  )
}

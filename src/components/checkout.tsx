'use client'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import React from 'react'

export default function Checkout({ preferenceId }: { preferenceId: string }) {
  console.log(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY)
  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string)
  return (
    <div>
      <Wallet initialization={{ preferenceId }} />
    </div>
  )
}

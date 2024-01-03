import { ROLES } from '@/constants/roles'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

export default async function Menu() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const isSeller = session?.user.role === ROLES.SELLER
  const isCustomer = session?.user.role === ROLES.CUSTOMER
  const roleLabel = isSeller ? 'vendedor' : 'comprador'
  return (
    <div className='m-4'>
      <h1 className='text-2xl mb-4'>Eres un {roleLabel}</h1>
      <ul>
        <li>
          <Link href={'/'}>Inicio</Link>
        </li>
        {isSeller && (
          <li>
            <Link href={'/seller'}>Vincular cuenta de MercadoPago</Link>
          </li>
        )}
        {isCustomer && (
          <li>
            <Link href={'/customer'}>Comprar tickets</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

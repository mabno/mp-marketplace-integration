import { ROLES } from '@/constants/roles'
import { prisma } from '@/lib/prisma'
import type { User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default async function Page() {
  const sellers = await prisma.user.findMany({
    where: {
      role: ROLES.SELLER,
      mercadopagoSellerLink: {
        isNot: null,
      },
    },
  })

  return (
    <div>
      <h1 className='text-3xl mb-6'>Estos usuarios venden tickets</h1>
      <ul className='grid grid-cols-1 divide-y'>
        {sellers.map((seller: User) => (
          <li key={seller.id} className='flex flex-row'>
            <div className='flex flex-col items-start gap-2 pd-2 border-1'>
              <span>{seller.email}</span>
              <span>{seller.name}</span>
              <Link className='block px-4 py-2 bg-[#4287F5]' href={`/customer/checkout?sellerId=${seller.id}`}>
                Comprar 🤑
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

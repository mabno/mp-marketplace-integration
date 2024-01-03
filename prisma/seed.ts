import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

const createUser = async (email: string, name: string, password: string, role: string) => {
  return await prisma.user.create({
    data: { email, name, password: crypto.createHash('sha256').update(password).digest('base64'), role },
  })
}

async function main() {
  const userCustomer = await createUser('customer@customer.com', 'Customer', 'Master@2022', 'CUSTOMER')
  const userSeller = await createUser('seller@seller.com', 'Seller', 'Master@2022', 'SELLER')

  console.log(userCustomer)
  console.log(userSeller)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })

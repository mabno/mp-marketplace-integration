import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')
 
}

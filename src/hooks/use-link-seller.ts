import { useQuery } from '@tanstack/react-query'

export const LINK_SELLER_KEY = 'LINK_SELLER_KEY'

export const useLinkSeller = (userId: string) => {
  return useQuery({
    queryKey: [LINK_SELLER_KEY],
    queryFn: async () => {
      const response = await fetch(`/api/mp/link-seller?userId=${userId}`)
      const data = await response.json()
      return data
    },
  })
}

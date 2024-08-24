import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
export const HelloRouter = createTRPCRouter({
  hello: protectedProcedure('admin').query(({ ctx }) => {
    return {
      name: 'Nerdy',
      age: 10,
    }
  }),
})

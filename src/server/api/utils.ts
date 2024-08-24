import { db } from '../db'

import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import type { Role } from '~/lib/types'
import { Admin, Manager } from '../db/schema'
export const getUserRoles = async (id: string): Promise<Role[]> => {
  const [adminExists, managerExists] = await Promise.all([
    db.select().from(Admin).where(eq(Admin.id, id)),
    db.select().from(Manager).where(eq(Manager.id, id)),
  ])
  const roles: Role[] = []
  if (adminExists.length > 0) roles.push('admin')
  if (managerExists.length > 0) roles.push('manager')
  return roles
}
export const authorizeUser = async (
  uid: string,
  roles: Role[],
): Promise<void> => {
  if (!roles || roles.length === 0) {
    return
  }
  const userRole = await getUserRoles(uid)
  if (!userRole.some((role) => roles.includes(role)))
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not have the required Role(s)',
    })
}

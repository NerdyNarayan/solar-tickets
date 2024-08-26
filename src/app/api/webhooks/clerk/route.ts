import type { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { user } from '~/server/db/schema'
export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json()
  if (payload.type === 'user.created') {
    const { id, first_name, last_name, image_url, username } = payload.data
    try {
      await db.insert(user).values({
        externalId: id,
        name: `${first_name || username} ${last_name || ''} `,
        imageUrl: image_url,
      })
      return NextResponse.json({ status: 'success' })
    } catch (e) {
      console.error(e)
      return NextResponse.json(
        { status: 'error', message: 'Failed to create user' },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json({ status: 'unsupported' })
  }
}

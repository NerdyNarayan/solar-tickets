import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { HydrateClient, api } from '~/trpc/server'
export default async function Home() {
  const data = await api.HelloRouter.hello()
  return (
    <HydrateClient>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />

        {data.name}
      </SignedIn>
    </HydrateClient>
  )
}

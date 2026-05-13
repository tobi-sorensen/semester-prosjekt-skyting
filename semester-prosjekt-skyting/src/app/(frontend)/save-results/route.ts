import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  const body = await req.json()

  const payload = await getPayload({
    config: configPromise,
  })

  const { eventId, shooters } = body

  for (const shooter of shooters) {
    await payload.create({
      collection: 'results',
      overrideAccess: true,
      data: {
        event: eventId,
        shooterName: shooter.navn,
        team: shooter.lag,
        standplass: shooter.standplass,
        startNumber: shooter.nr,
        class: shooter.klasse,

        post1: shooter.posts[0]?.treff ?? 0,
        inner1: shooter.posts[0]?.inner ?? 0,

        post2: shooter.posts[1]?.treff ?? 0,
        inner2: shooter.posts[1]?.inner ?? 0,

        post3: shooter.posts[2]?.treff ?? 0,
        inner3: shooter.posts[2]?.inner ?? 0,

        post4: shooter.posts[3]?.treff ?? 0,
        inner4: shooter.posts[3]?.inner ?? 0,

        post5: shooter.posts[4]?.treff ?? 0,
        inner5: shooter.posts[4]?.inner ?? 0,

        post6: shooter.posts[5]?.treff ?? 0,
        inner6: shooter.posts[5]?.inner ?? 0,

        total: shooter.total,
        sf1: shooter.sf1,
        sf2: shooter.sf2,
      },
    })
  }

  return NextResponse.json({
    success: true,
  })
}
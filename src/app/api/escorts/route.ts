import { NextRequest, NextResponse } from 'next/server'
import { EscortAPI } from '@/lib/api/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const location = searchParams.get('location')
    const minRate = searchParams.get('minRate') ? parseFloat(searchParams.get('minRate')!) : undefined
    const maxRate = searchParams.get('maxRate') ? parseFloat(searchParams.get('maxRate')!) : undefined
    const services = searchParams.get('services')?.split(',') || undefined
    const languages = searchParams.get('languages')?.split(',') || undefined
    const status = searchParams.get('status') as 'active' | 'inactive' | 'suspended' | undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0

    const filters = {
      location: location || undefined,
      minRate,
      maxRate,
      services,
      languages,
      status,
      limit,
      offset
    }

    const result = await EscortAPI.getEscorts(filters)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch escorts' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.data?.length || 0
    })
  } catch (error) {
    console.error('Error fetching escorts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.user_id || !body.name || !body.age || !body.hourly_rate || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await EscortAPI.createEscortProfile(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create escort profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating escort profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

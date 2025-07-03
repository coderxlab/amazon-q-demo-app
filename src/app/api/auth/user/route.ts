import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!user) {
    return NextResponse.json({ error: 'No user found' }, { status: 401 })
  }

  // get user profile data
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('first_name, last_name, username')
    .eq('id', user.id)
    .single()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  return NextResponse.json({ 
    user: {
      ...user,
      profile
    }
  })
}
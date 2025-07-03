import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName, username } = await request.json()
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // create user profile if signup successful
  if (data.user) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        username: username
      })

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }
  }

  return NextResponse.json({ user: data.user })
}
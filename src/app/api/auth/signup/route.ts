import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName, username } = await request.json()
  const supabase = await createClient()

  // check if username already exists
  if (username) {
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    // Map Supabase auth errors to user-friendly messages
    let errorMessage = error.message
    if (error.message.includes('already registered')) {
      errorMessage = 'User already registered'
    } else if (error.message.includes('Invalid email')) {
      errorMessage = 'Invalid email'
    } else if (error.message.includes('Password')) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 })
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
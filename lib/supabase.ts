import { createClient } from "@supabase/supabase-js"

// Singleton browser client (safe to use anon keys here)
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseBrowserClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabaseClient
}

// Server-side Supabase client (using service role key - keep secret!)
export const getSupabaseServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Use same URL as client
    process.env.SUPABASE_SERVICE_ROLE_KEY!, 
    {
      auth: {
        persistSession: false, // typically you disable session persistence server-side
      },
    }
  )
}


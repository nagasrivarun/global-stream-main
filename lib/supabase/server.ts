import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Create a supabase client for server-side usage
export const createClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

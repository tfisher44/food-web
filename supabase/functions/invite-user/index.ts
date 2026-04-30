// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
const anonKey = Deno.env.get("SUPABASE_ANON_KEY")

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  throw new Error("Missing required Supabase environment variables")
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  })
}

type InviteRequestBody = {
  email?: string
  siteId?: number
}

// check if the user has an exisitng account or not
async function findUserByEmail(email: string) {
  const {data, error} = await supabase.from("user_profiles").select("user_id, name, email").eq("email", email.toLowerCase()).maybeSingle()

  if (error){
    throw new Error("Error searching user_profiles" + error.message)
  }

  return data ?? null
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  try {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return jsonResponse({ error: "Missing Authorization header" }, 401)
    }

    const requesterClient = createClient(supabaseUrl, anonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    })

    const { data: requesterData, error: requesterError } = await requesterClient.auth.getUser()
    if (requesterError || !requesterData.user) {
      return jsonResponse({ error: "Unauthorized user" }, 401)
    }

    // parse and validate inputs
    const body: InviteRequestBody = await req.json()
    const email = body.email?.trim().toLowerCase()
    const siteId = body.siteId

    if (!email) return jsonResponse({ error: "Missing email" }, 400)
    if (!siteId) return jsonResponse({ error: "Missing siteId" }, 400)

    const { data: managerRow, error: managerError } = await supabase
      .from("site_managers")
      .select("user_id")
      .eq("user_id", requesterData.user.id)
      .eq("site_id", siteId)
      .maybeSingle()

    if (managerError) {
      return jsonResponse({ error: managerError.message }, 500)
    }

    if (!managerRow) {
      return jsonResponse({ error: "You do not have invite permissions for this site" }, 403)
    }

    // check for existing user
    const existingUser = await findUserByEmail(email)

    // add site management permissions if the user already exists
    if(existingUser) {
      const { error: insertExistingError } = await supabase.from("site_managers").insert({
        user_id: existingUser.user_id,
        site_id: siteId,
        name: existingUser.name
      })

      if (insertExistingError) {
        return jsonResponse({ error: insertExistingError.message }, 500)
      }
    } else {
      // if the user doesn't exist yet, invite them
      const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email)

      if(inviteError) {
        return jsonResponse({ error: inviteError.message }, 500)
      }

      if (!inviteData.user) {
        return jsonResponse({ error: "Invite did not return a user" }, 500)
      }

      // add the new user to the site managers table with their site id
      const { error: insertInvitedError } = await supabase.from("site_managers").insert({
        user_id: inviteData.user.id,
        site_id: siteId,
        name: "temp"
      })

      if (insertInvitedError) {
        return jsonResponse({ error: insertInvitedError.message }, 500)
      }
    }

    // return success response
    return jsonResponse({ success: true }, 200)
  } 
  catch (error){
    const message = error instanceof Error ? error.message : "Unknown error"
    return jsonResponse({ error: message }, 500)
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/invite-user' \
    --header 'Authorization: Bearer <YOUR_USER_JWT>' \
    --header 'Content-Type: application/json' \
    --data '{"email":"newmanager@example.com","siteId":1}'

*/
import { supabase } from "../supabaseClient";

// sign up user using email, password, and name
export async function signUpNewUser(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: name,
          },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data.user;
}

// sign in user with email and password
export async function signInWithEmail(email, password) {
    const { data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error || !data?.user) {
        throw new Error(error?.message || "Login failed")
    }

    return data.user;
}

// check if user exists in the site_managers table
export async function checkSiteManager(userID){
    const { data: siteManager, error: error } = await supabase.from("site_managers").select("user_id").eq("user_id", userID).maybeSingle();

    if (error) {
        throw new Error(error.message);
    }
    
    if (siteManager) {
        return true;
    }
    return false;
}

// update password with new password
export async function updatePassword(password) {
    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
        throw new Error(error.message);
    }
}

// reset password by sending reset password link to user email
export async function resetPassword(email) {
    const {error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://foodweb.community/change-password', 
    });

    if (error) {
        throw new Error(error.message);
    }
}

// sign out the user
export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error && !error.message?.includes("session")) {
        throw new Error(error.message);
    }
}

// used in Complete User Profile page to update display name after site manager invite
export async function updateDisplayName(name) {
    // update display name in auth table
    const {error: updateAuthNameError} = await supabase.auth.updateUser({
        data: {display_name: name}
    });
    if(updateAuthNameError){
        throw new Error(error.message);
    }

    // Get current user id from session/auth context
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        throw new Error(userError?.message || "Unable to get current user");
    }

    // update display name in user profiles table
    const {error: updateProfileNameError} = await supabase.from("site_profiles").update({display_name: name}).eq("user_id", userData.user.id);
    if(updateProfileNameError){
        throw new Error(error.message);
    }
}

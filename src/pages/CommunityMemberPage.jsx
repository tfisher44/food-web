import { supabase } from "../supabaseClient"
import "./CommunityMemberPage.css"

function CommunityMemberPage({session}) {

    const dispalyName = session.user.user_metadata.display_name;

    return (
        <div className="CM-page-content">
            <h1>Hello {dispalyName}!</h1>
            <h3>Role: Community Member</h3>
            {/* TODO: add form link to here */}
            <h3>If you are a site manager, please request editing permissions to your site here.</h3>
        </div>
    )
}

export default CommunityMemberPage
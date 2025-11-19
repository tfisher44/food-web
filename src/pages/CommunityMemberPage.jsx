import "./CommunityMemberPage.css"
import { useAuth } from "../contexts/AuthContext"

function CommunityMemberPage() {
    const { session } = useAuth();

    const dispalyName = session.user.user_metadata.display_name;

    return (
        <div className="CM-page-content">
            <h1>Hello {dispalyName}!</h1>
            <h3>Role: Community Member</h3>
            {/* TODO: add form link to here */}
            <h3>If you manage a site, please request editing permissions to your site {" "}
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScEu7QLUfBBMhLidhB5wUJ_1GCGTWdpuR9KccBZlrDXylGezQ/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer">
                    here
                </a>.
            </h3>
        </div>
    )
}

export default CommunityMemberPage
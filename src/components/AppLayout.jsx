import Navbar from "./Navbar"

function AppLayout({ children, session }){
    return (
        <>
            <header>
                <Navbar session={session}/>
            </header>

            <main>{children}</main>

            {/* <footer>Food Web Footer</footer> */}
        </>
    );
}

export default AppLayout;
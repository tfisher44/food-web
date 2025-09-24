import Navbar from "./Navbar"

function AppLayout({ children }){
    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>

            <main>{children}</main>

            {/* <footer>Food Web Footer</footer> */}
        </>
    );
}

export default AppLayout;
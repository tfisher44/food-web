import Navbar from "./Navbar"

function AppLayout({ children }){
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>{children}</main>
        </>
    );
}

export default AppLayout;
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../css/Layout.css"

export default function Layout ({ children }) {
return(
    <>
    <Header/>
    {children}
    <Footer/>
    </>
)
};
import { useContext, useState } from "react"
import "../styles/header.scss"
import { MainContext } from "../context/MainContext"
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from 'react-router-dom';

function Header() {

    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false)

    const location = useLocation().pathname
    const { isMobilePortrait } = useContext(MainContext)


    const menu = [
        { "location": "/", "text": "Create a secret" },
        { "location": "/security", "text": "How is it secure ?" },
        { "location": "/contact", "text": "Contact" },
    ]

    function handleMenuClick() {
        setIsMenuDisplayed(!isMenuDisplayed)
    }

    if (!isMobilePortrait) return <div className="Header">
        <a href="/"><b className="Black">OneTime</b><b className="Colored">Share</b></a>
        {menu.map((element, index) => <a key={index} className={(location === element.location ? "Selected" : "Unselected")} href={element.location}>{element.text}</a>)}
    </div>
    else return <div className="Header">
        <GiHamburgerMenu onClick={handleMenuClick} className="Hamburger" size="3em" ></GiHamburgerMenu>
        <div className={"Menu " + (isMenuDisplayed ? "Opened" : "Closed")}>
            <a href="/"><b className="Black">OneTime</b><b className="Colored">Share</b></a>

            {menu.map((element, index) => <a key={index} className={(location === element.location ? "Selected" : "Unselected")} href={element.location}>{element.text}</a>)}

        </div>
    </div>
}

export default Header
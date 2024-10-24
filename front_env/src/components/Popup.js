import "../styles/popup.scss"
import { MainContext } from '../context/MainContext.js';
import { useContext } from 'react'



function Popup(props) {

    const { setIsPopupDisplayed } = useContext(MainContext)

    window.addEventListener('keydown', function (event) {
        // Vérifie si la touche pressée est 'Escape'
        if (event.key === 'Escape') {
            setIsPopupDisplayed(false)
        }
    });

    return (
        <div className="Popup" onClick={(e) => {
            if (e.target.className === "Popup") {
                setIsPopupDisplayed(false)

            }
        }}>
            <div className={"Content " + props.customClass}>
                {props.children}
            </div>
        </div>
    )
}

export default Popup
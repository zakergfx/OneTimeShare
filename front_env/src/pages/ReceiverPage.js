import React, { useState, useEffect } from 'react'
import * as Api from "../utils/Api.js"
import * as Tools from "../utils/Tools.js"
import Alert from "../components/Alert.js"
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/receiver.scss"
import { FaRegCopy } from "react-icons/fa";

function ReceiverPage() {


    const navigate = useNavigate()

    const askedSecretId = (useLocation().pathname).split("/").pop()

    const [isOnce, setIsOnce] = useState()
    const [days, setDays] = useState()
    const [content, setContent] = useState()

    const [isSecretRevealed, setIsSecretRevealed] = useState(false)

    async function handleCopy() {
        const text = content
        await navigator.clipboard.writeText(text);
        Alert.success("Secret copied !")
    }

    useEffect(() => {
        async function fetching() {
            const response = await Api.fetchGet(`/api/secrets/${askedSecretId}?step=1`)
            console.log(response)

            if (response.success) {
                setIsOnce(response.data.isonce)
                setDays(Tools.calcRemainingDays(response.data.expirationdate))
            }
            else {
                Alert.error(response.data)
                navigate("/404")
            }

        }

        fetching()
    // eslint-disable-next-line
    }, [])

    async function handleClick() {
        const response = await Api.fetchGet(`/api/secrets/${askedSecretId}?step=2`)
        console.log(response)

        if (response.success) {
            setContent(response.data.content)
            setIsSecretRevealed(true)
        }
        else {
            Alert.error(response.data)
        }


    }
    console.log(!isSecretRevealed && isOnce)
    return (
        <div className="ReceiverPage">
            {!isSecretRevealed && isOnce !== undefined?
                <div className="Content">
                    <h1>You just received a secret</h1>
                    <h3 >Click on the button below the reveal it</h3>
                    <button onClick={handleClick} id="big" className="Main">Reveal the secret</button>
                    <p>{isOnce ? `Be careful ! The secret can be retrieved once and will expire in ${days} hours.` : `The secret will expire in ${days} hours.`}</p>
                </div > : isOnce !== undefined &&
                <div className="Content">
                    <h1>Here is your secret message</h1>
                    <h3>Content</h3>
                    <div className="CopySection">
                        <textarea disabled value={content}></textarea>
                        <FaRegCopy onClick={handleCopy} size="1.5em" className="Icon" />
                    </div>
                    <p>{isOnce ? `Be careful ! The secret link is now expired. The page can't be reloaded.` : `The secret will expire in ${days} hours.`}</p>
                    <button onClick={handleCopy} className="Main">Copy the content</button>
                    <button onClick={() => window.location.replace("/")} className="Second">Create a secret</button>
                </div >

            }

        </div>

    )
}

export default ReceiverPage
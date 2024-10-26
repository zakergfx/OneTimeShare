import { useState } from 'react'
import * as Api from "../utils/Api.js"
import "../styles/main.scss"
import { FaRegCopy } from "react-icons/fa";
import Alert from '../components/Alert.js';

function MainPage() {


    const [content, setContent] = useState("")
    const [days, setDays] = useState(1)
    const [isOnce, setIsOnce] = useState(true)
    const [url, setUrl] = useState()
    const [secret, setSecret] = useState()

    const [secretIsCreated, setSecretIsCreated] = useState(false)



    async function handleSubmit(e) {
        e.preventDefault()

        const body = {
            "content": content,
            "expirationdate": parseInt(days),
            "isonce": isOnce
        }

        const response = await Api.fetchPost("/api/secrets/", body)

        if (response.success) {
            Alert.success("Secret link generated !")
            setSecretIsCreated(true)
            setUrl(`${process.env.REACT_APP_SERVERNAME}/secrets/${response.data.uri}`)
            setSecret(response.data.uri)
        }
        else {
            Alert.error(response.data)
        }
    }

    async function handleCopy() {
        const text = url
        await navigator.clipboard.writeText(text);
        Alert.success("Secret link copied !")
    }

    async function handleRemove() {
        console.log("secret", secret)
        const response = await Api.fetchDelete(`/api/secrets/${secret}`)
        if (response.success){
            Alert.success("Secret link removed !")
            setSecretIsCreated(false)
            setContent("")
            setDays(1)
            setIsOnce(true)
        }
        else{
            Alert.error("Secret link could not be removed")
        }


    }

    return (
        <div className="MainPage">
            {!secretIsCreated ? <div className="Content">
                <h1>Share a secret without leaving any traces</h1>
                <form onSubmit={handleSubmit}>
                    <h3 >Content</h3>
                    <textarea onChange={(e) => setContent(e.target.value)} value={content} id="content" name="content" required placeholder="Type the content here..."></textarea>
                    <h3>Customize</h3>
                    <div className="Setting" id="setting1">
                        <p>Link lasts</p>
                        <select onChange={(e) => setDays(e.target.value)} value={days} id="days">
                            <option disabled>Select a number</option>
                            {[...Array(7)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                        <p>days</p>
                    </div>
                    <div className="Setting" id="setting2">
                        <p>Link expires after opened once</p>
                        <input onChange={(e) => setIsOnce(e.target.checked)} checked={isOnce} id="isOnce" type="checkbox"></input>
                    </div>
                    <button className="Main">Generate the secret link</button>
                </form>
            </div > :
                <div className="Content">
                    <h1>Here is your secured link. Share it now</h1>
                    <h3>Share this link</h3>
                    <div className="CopySection">
                        <input value={url} disabled></input>
                        <FaRegCopy onClick={handleCopy} className="Icon" size="1.5em" />
                    </div>
                    <p>Expires in {days} day{days > 1 ? "s": null} and {isOnce ? "can be opened once" : "Can be open multiple times"}</p>
                    <button onClick={handleCopy} className="Main">Copy the link</button>
                    <h3>Content</h3>
                    <textarea disabled value={content}></textarea>
                    <button onClick={handleRemove} className="Remove">Remove the secret</button>
                    <button onClick={() => window.location.reload()} className="Second">Create another secret</button>


                </div>
            }
        </div>

    )
}

export default MainPage
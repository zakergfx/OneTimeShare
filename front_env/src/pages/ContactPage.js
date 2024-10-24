import "../styles/contact.scss"
import * as Api from "../utils/Api.js"
import Alert from "../components/Alert.js"
import {useNavigate} from "react-router-dom"
import {useState} from "react"

function ContactPage() {
    
    const navigate = useNavigate()

    const [content, setContent] = useState()

    async function handleOnClick(){

        const response = await Api.fetchPost("/api/sendmail", {"content": content})
        if (response.success){
            Alert.success("Mail sent !")
            navigate("/")
        }
        else{
            Alert.error('Mail coult not be sent !')
        }
    }

    return (
        <div className="ContactPage">
            <div className="Content">
                <h1>Contact us </h1>
                <p>Use this form to contact us</p>
                <p>whether it is to report a bug, to ask a question, or anything else</p>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type your message here..." required></textarea>
                <button onClick={handleOnClick} className="Main">Send</button>
            </div >
        </div>

    )
}

export default ContactPage
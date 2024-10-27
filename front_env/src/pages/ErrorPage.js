import { useNavigate } from 'react-router-dom';
import "../styles/error.scss"

function ErrorPage() {
    const navigate = useNavigate()
    return (
        <div className="ErrorPage">
            <div className="Content">
                <h1>404 Error: Page not found</h1>
                <p>The requested page has not been found</p>
                <p>Maybe that the secret URL is incorrect or this is an expired secret</p>
                <button onClick={() => navigate("/")} className="Main">Come back home</button>
            </div >
        </div>

    )
}

export default ErrorPage
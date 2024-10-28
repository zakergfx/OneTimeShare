import "../styles/secure.scss"

function SecurePage() {
    return (
        <div className="SecurePage">
            <div className="Content">
                <h1>How it it secure ?</h1>
                <ul>
                    <li>Secrets have a <b>limited lifetime</b>, 7 days is the maximum</li>
                    <li>By default secrets are automatically <b>removed after opened once</b></li>
                    <li>The transmission of data is <b>encrypted using HTTPS</b></li>
                    <li>The secrets are stored using <b>AES encryption </b></li>
                    <li>We do <b>not keep logs</b> about shared data</li>
                </ul>
            </div >
        </div>

    )
}

export default SecurePage
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { MainProvider } from './context/MainContext.js';
import { ToastContainer } from 'react-toastify';
import "./index.scss"
import MainPage from './pages/MainPage';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header.js';
import ReceiverPage from "./pages/ReceiverPage"
import ErrorPage from './pages/ErrorPage.js';
import ContactPage from './pages/ContactPage.js';
import SecurePage from './pages/SecurePage.js';

function App() {
  return (
    <MainProvider>
      <div className="App">
        <Router>
          <Header></Header>
          <div className="WithoutHeader">
            <ToastContainer />
            <HelmetProvider>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/receiver" element={<ReceiverPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/secrets/*" element={<ReceiverPage />} />
                <Route path="/security" element={<SecurePage/>}/>
                <Route path="/*" element={<ErrorPage />} />

              </Routes>
            </HelmetProvider>
          </div>

        </Router>
      </div >
    </MainProvider>
  );
}

export default App;

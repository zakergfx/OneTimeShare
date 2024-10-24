import { createContext, useState, useEffect } from 'react'

export const MainContext = createContext()

export function MainProvider({ children }) {

    const [isPopupDisplayed, setIsPopupDisplayed] = useState(false)
    const [popupType, setPopupType] = useState()


    const useMediaQuery = (query) => {
        const [matches, setMatches] = useState(window.matchMedia(query).matches);

        useEffect(() => {
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = () => setMatches(media.matches);
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }, [matches, query]);

        return matches;
    };


    const isMobilePortrait = useMediaQuery('(max-width: 768px)');

    const contextData = {
        isPopupDisplayed: isPopupDisplayed,
        setIsPopupDisplayed: setIsPopupDisplayed,
        popupType: popupType,
        setPopupType: setPopupType,
        isMobilePortrait: isMobilePortrait,
    }


    return (
        <MainContext.Provider value={contextData}>
            {children}
        </MainContext.Provider>
    )
}
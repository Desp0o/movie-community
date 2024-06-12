import { useEffect, useState } from 'react'
import geoLang from "../languages/geoLanguage.json"
import engLang from "../languages/engLanguage.json"

export const useLanguage = () => {

    const [selecetedLanguage, setSelectedLanguage] = useState(localStorage.getItem("language") || geoLang)
    const [isEng, setEng] = useState(false)

    const languageHandler = () => {
        setEng(!isEng)
    }

    useEffect(()=>{
        setSelectedLanguage(!isEng ? geoLang : engLang)
    },[isEng])

  return { languageHandler, selecetedLanguage}
}

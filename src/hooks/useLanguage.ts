import { useEffect, useState } from 'react';
import geoLang from '../languages/geoLanguage.json';
import engLang from '../languages/engLanguage.json';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../Redux/languageSlicer';

interface RootState {
    languageStore:{
        language: string
    }
}

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("language") === 'geo' ? geoLang : engLang);
  const dispatch = useDispatch()

  
  const isGeo = useSelector((state: RootState) => state.languageStore.language)

  const languageHandler = () => {
    dispatch(setLanguage(!isGeo))
  };

  useEffect(()=>{
    setSelectedLanguage(isGeo ? geoLang : engLang)
    localStorage.setItem("language", isGeo ? "geo" : "eng")
},[isGeo])

  return { languageHandler, selectedLanguage };
};

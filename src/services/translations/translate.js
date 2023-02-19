// import your translation file
import { translations as mainPageTranslations } from '../../pages/main-page/translations'
import { translations as errorPageTranslations } from '../../pages/error-page/translations'
import { useSelector } from 'react-redux'

const setTranslations = () => {
  // use your translation file
  const translationObjects = [mainPageTranslations, errorPageTranslations]
  return translationObjects.reduce((acc, item) => ({ ...acc, ...item }), {})
}
const translations = setTranslations()

export const translate = (path, locale) => {
  let keys = [...path]
  let translationObject = translations
  let translationKey = keys.shift()
  const finalLocale = locale || useSelector((state) => state.locale.locale)

  while (keys.length) {
    translationObject = translationObject[translationKey]
    translationKey = keys.shift()
  }

  if (translationObject?.[translationKey]?.[finalLocale]) {
    return translationObject[translationKey][finalLocale]
  }

  return path[path.length - 1]
}

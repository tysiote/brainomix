export const getLanguageByValue = (languages, value) =>
  languages.filter((language) => language.value === value)[0]

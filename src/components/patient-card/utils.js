// just converting string to date
export const getDate = (source, locale) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  })

  return formatter.format(new Date(source))
}

// getting the right translation_key for state
export const translateState = (state) => {
  switch (state.toLowerCase()) {
    case 'ready':
      return `patientStateReady`
    case 'failed':
      return `patientStateFailed`
    case 'waiting':
      return `patientStateWaiting`
    default:
      return 'patientStateUnknown'
  }
}

// getting the right translation_key for gender
export const translateGender = (gender) => {
  switch (gender.toLowerCase()) {
    case 'm':
      return `patientGenderMale`
    case 'f':
      return `patientGenderFemale`
    case 'o':
      return `patientGenderOther`
    default:
      return 'patientGenderUnknown'
  }
}

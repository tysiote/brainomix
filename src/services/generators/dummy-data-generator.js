export const generateDummyData = (count) => {
  const result = []

  for (let i = 0; i < count; i += 1) {
    result.push(generateDummyPatient(i + 1))
  }

  return result
}

const generateRandomDate = (min, max) => {
  const difference = max - min
  const randomValue = Math.random() * difference
  const date = new Date(min)
  date.setMilliseconds(date.getMilliseconds() + randomValue)

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const generateGender = () => {
  const randomValue = Math.random()

  if (randomValue < 0.1) {
    return 'O'
  }

  if (randomValue < 0.55) {
    return 'F'
  }

  return 'M'
}

const generateId = () =>
  Math.random() < 0.75 ? `${Math.floor(Math.random() * 100000000)}` : generateName()

const generateName = () => (Math.random() + 1).toString(36).substring(2)

const generateManufacturer = () => `Manufacturer-${Math.ceil(Math.random() * 10)}`

const generateModel = () => `Model-${Math.ceil(Math.random() * 10)}`

const generateSeriesDescription = () => `Series description ${Math.ceil(Math.random() * 10)}`

const generateStudyDescription = () => `Study description ${Math.ceil(Math.random() * 10)}`

const generateSliceThickness = () => parseFloat((Math.random() * 10).toFixed(2))

const generateState = () => {
  const randomValue = Math.random()
  if (randomValue < 0.33) {
    return 'ready'
  }

  if (randomValue < 0.67) {
    return 'failed'
  }

  return 'waiting'
}

const generateThumbnail = () =>
  `https://brainomix-web-media.s3-eu-west-1.amazonaws.com/recruitment/fe-challenge/thumbnail1_${Math.ceil(
    Math.random() * 5
  )}.png`

const generateUrl = (id) => `http://www.example.com/item1_${id}`

const generateDummyPatient = (id) => {
  const minDate = new Date()
  const maxDate = new Date()
  minDate.setFullYear(1900)
  maxDate.setFullYear(1999)
  const patient_dob = generateRandomDate(minDate, maxDate)
  minDate.setFullYear(2000)
  maxDate.setFullYear(2020)
  const timestamp = generateRandomDate(minDate, maxDate)

  return {
    id,
    patient_dob: Math.random() < 0.1 ? null : patient_dob,
    patient_gender: Math.random() < 0.1 ? null : generateGender(),
    patient_id: Math.random() < 0.1 ? null : generateId(),
    patient_name: Math.random() < 0.1 ? null : generateName(),
    scanner_manufacturer: generateManufacturer(),
    scanner_model: generateModel(),
    series_description: generateSeriesDescription(),
    slice_thickness: generateSliceThickness(),
    state: generateState(),
    study_description: generateStudyDescription(),
    thumbnail: generateThumbnail(),
    timestamp,
    url: generateUrl(id)
  }
}

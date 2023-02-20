export const getPatientById = (patients, id) => patients.filter((patient) => patient.id === id)[0]

// generic sorting function (should be working even for sorting more than id/name/state)
export const sortPatientsByAttribute = (patients, attribute, asc) => {
  const ascMultiplier = asc ? 1 : -1

  return [...patients].sort((a, b) =>
    (a[attribute] ?? '') > (b[attribute] ?? '') ? ascMultiplier : -ascMultiplier
  )
}

// search filtering looks for matching the patient's name or their id
export const filterPatientsByKeyword = (patients, keyword) =>
  patients.filter(
    (patient) =>
      patient.patient_name?.toLowerCase().includes(keyword) ||
      patient.patient_id?.toLowerCase().includes(keyword)
  )

export const getHashValue = () => {
  const hashValue = window.location.hash.substring(1)
  return hashValue
}
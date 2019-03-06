// Utility to generate time and date for the posts and comments

export const dateCreator = (timestamp) => {
  let date = new Date(timestamp)
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
  let result = `${date.getDate()} ${months[date.getMonth()-1]}, ${date.getFullYear()}`
  return result
}

export const timeCreator = (timestamp) => {
  let time = new Date(timestamp)
  let minutes = time.getMinutes()
  if (minutes < 10)
    minutes = "0" + minutes
  let result = `${time.getHours()}:${minutes}`
  return result
}

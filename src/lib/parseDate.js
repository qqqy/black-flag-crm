export default function parseDate(date){
  return new Date(date).toDateString().split(' ').splice(1 , 2).reduce((acc, val) => {return acc + ' ' + val})
}
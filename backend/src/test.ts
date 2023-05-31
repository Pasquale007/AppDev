const dateString1 = "2022-04-15"; // first date in "YYYY-MM-DD" format
const dateString2 = "2022-04-20"; // second date in "YYYY-MM-DD" format

const timeShift = -2
const outboundDate: Date = new Date()
const shiftedOutboundDate: Date = outboundDate.setHours(outboundDate.getHours() + timeShift)
console.log(shiftedOutboundDate)
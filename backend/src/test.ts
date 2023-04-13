const dateString1 = "2022-04-15"; // first date in "YYYY-MM-DD" format
const dateString2 = "2022-04-20"; // second date in "YYYY-MM-DD" format

const date1: Date = new Date(dateString1);
const date2: Date = new Date(dateString2);

if (date1 < date2) {
    console.log(`${dateString1} is smaller than ${dateString2}.`);
} else {
    console.log(`${dateString1} is not smaller than ${dateString2}.`);
}

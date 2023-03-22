const dateString1: string = "2022-04-15"; // first date in "YYYY-MM-DD" format
const dateString2: string = "2022-04-20"; // second date in "YYYY-MM-DD" format

const date1: Date = new Date(dateString1);
const date2: Date = new Date(dateString2);

if (new Date(dateString1) < new Date(dateString2)) {
    console.log(`${dateString1} is smaller than ${dateString2}.`);
} else {
    console.log(`${dateString1} is not smaller than ${dateString2}.`);
}
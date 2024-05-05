const { Timestamp } = require('firebase-admin/firestore');

const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
};

const formatDateTime = (timestamp) => {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const transformDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const transformedDate = `${month}/${day}/${year}`;

    return transformedDate;
}

const transformDateTimeFormat = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(":");
    const transformedDateTimeString = `${month}/${day}/${year} ${hour}:${minute}:${second}`;

    return transformedDateTimeString;
};

const dateToFirebaseTimestamp = (dateString) => {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split("/");

    // Create a JavaScript Date object using the parsed components
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date

    // Convert the JavaScript Date object to a Firebase timestamp
    const timestamp = Timestamp.fromDate(date);

    return timestamp;
};

module.exports = {
    formatDate,
    formatDateTime,
    transformDateFormat,
    transformDateTimeFormat,
    dateToFirebaseTimestamp
};
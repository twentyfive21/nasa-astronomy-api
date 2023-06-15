function getInput () {
 const searchBtn = document.getElementById("search-btn"); // a link 
 const input = document.getElementById("search-date");
 const invalid = document.getElementById("invalid");
 const oldestDate = new Date("1995-06-20");
 const currentDate = new Date();

 input.addEventListener("input", (event) => {
    const selectedDate = new Date(event.target.value);

    if (selectedDate > currentDate) {
        invalid.innerHTML = "Please select a date not greater than the current day."
    } else if (selectedDate < oldestDate) {
        invalid.innerHTML = "NASA does not have any images before this date";
    } else {
    searchBtn.href = `details.html?&date=${event.target.value}`; // date
    } 
    console.log(`select ${selectedDate}`)
    console.log(`curr ${currentDate}`)
 })
}
getInput();


 
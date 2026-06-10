// DISPLAY TIME
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    

    // Add leading zeros
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    

    let timeString = hours + ":" + minutes;

    document.getElementById("time").textContent = timeString;

    if (hours < 12 ){

        document.getElementById("greetings").textContent = "Good Morning Amani";

    }
    else if (hours >= 12 && hours < 18){ document.getElementById("greetings").textContent = "Good Afternoon Amani";

    } 
    else { document.getElementById("greetings").textContent = "Good Evening Amani";

    }
}
// Update the clock every second
setInterval(updateClock, 1000);

// Run immediately on page load
updateClock();

//QUOTES
// QUOTES
const quotes = [
  "You do not need motivation, just begin.",
  "Start messy. Clarity comes later.",
  "Do it tired. Do it anyway.",
  "Small steps still count.",
  "Consistency > intensity.",
  "You are allowed to go slow, just do not stop.",
  "Thinking will not change it. Doing will.",
  "Not everything needs to be figured out today.",
  "One step is enough for now.",
  "You are not behind, you are building.",
  "Different timeline, same potential.",
  "Focus on your path.",
  "Becoming her, slowly and surely.",
  "Quiet progress is still progress.",
  "This version of me is just the beginning.",
  "Discipline is choosing what you want most over what you want now.",
  "Show up for yourself, even on the hard days.",
  "You have done hard things before. You can do this too.",
  "Progress, not perfection.",
  "Lock in. Future you is watching.",
  "Fear is not my future.",
  "If you don't like something, change it.",
  "If you think you can't change it, change your attitude.",
];

function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quote").textContent = quote;    
}

// Change quote every 10 seconds
setInterval(updateQuote, 300000);

// Show one immediately on page load
updateQuote();

//CALENDAR
function createCalendar() {
    const daysDiv = document.querySelector(".days");
    const weekdaysDiv = document.querySelector(".weekdays");
    daysDiv.innerHTML = "";
    weekdaysDiv.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    document.getElementById("month-year").textContent = `${monthNames[month]} ${year}`;

    const weekdayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];
    weekdayNames.forEach(day => {
        const wd = document.createElement("div");
        wd.textContent = day;
        weekdaysDiv.appendChild(wd);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty slots for alignment
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        daysDiv.appendChild(empty);
    }

    // Dates
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = i;
        dayElement.classList.add("day");

        if (i === date) {
            dayElement.classList.add("today");
        }

        daysDiv.appendChild(dayElement);
    }
}

// Run on page load
createCalendar();

document.addEventListener("click", function() {
    window.location.href="main.html";
});


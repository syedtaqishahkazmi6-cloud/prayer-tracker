const db = firebase.database();
const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Load and save attendance checkboxes
const rows = document.querySelectorAll("tbody tr");
rows.forEach((row, rowIndex) => {
    const prayer = prayers[rowIndex];
    row.querySelectorAll("input[type='checkbox']").forEach((checkbox, colIndex) => {
        const day = weekdays[colIndex];
        const ref = db.ref(`attendance/${prayer}/${day}`);

        ref.once("value").then(snapshot => {
            if (snapshot.exists()) {
                checkbox.checked = snapshot.val();
            }
        });

        checkbox.addEventListener("change", () => {
            ref.set(checkbox.checked);
        });
    });
});

// Load and save today's task box
const notesBox = document.getElementById("today-notes");
const notesRef = db.ref("notes/today");

notesRef.once("value").then(snapshot => {
    if (snapshot.exists()) {
        notesBox.value = snapshot.val();
    }
});

notesBox.addEventListener("input", () => {
    notesRef.set(notesBox.value);
});
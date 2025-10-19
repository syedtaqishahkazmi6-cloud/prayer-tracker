// ✅ Connect to Firebase
const db = firebase.database();

// ✅ Define prayer names and weekdays
const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ✅ Load and save attendance checkboxes
const rows = document.querySelectorAll("tbody tr");
rows.forEach((row, rowIndex) => {
  const prayer = prayers[rowIndex];
  row.querySelectorAll("input[type='checkbox']").forEach((checkbox, colIndex) => {
    const day = weekdays[colIndex];
    const ref = db.ref(`attendance/${prayer}/${day}`);

    // Load from Firebase
    ref.once("value").then(snapshot => {
      if (snapshot.exists()) {
        checkbox.checked = snapshot.val();
      }
    });

    // Save to Firebase
    checkbox.addEventListener("change", () => {
      ref.set(checkbox.checked);
    });
  });
});

// ✅ Clear all checkboxes in a column (per weekday)
function clearColumn(colIndex) {
  rows.forEach((row, rowIndex) => {
    const prayer = prayers[rowIndex];
    const day = weekdays[colIndex];
    const cell = row.cells[colIndex + 1]; // +1 skips prayer name column
    const checkbox = cell.querySelector("input[type='checkbox']");
    if (checkbox) {
      checkbox.checked = false;
      db.ref(`attendance/${prayer}/${day}`).set(false);
    }
  });
}

// ✅ Load and save today's task box
const notesBox = document.getElementById("today-notes");
const notesCount = document.getElementById("notes-count");
const notesRef = db.ref("notes/today");

notesRef.once("value").then(snapshot => {
  if (snapshot.exists()) {
    notesBox.value = snapshot.val();
    updateCount();
  }
});

notesBox.addEventListener("input", () => {
  notesRef.set(notesBox.value);
  updateCount();
});

// ✅ Count non-empty lines in task box
function updateCount() {
  const lines = notesBox.value.split("\n").filter(line => line.trim() !== "");
  notesCount.textContent = `${lines.length} task${lines.length !== 1 ? "s" : ""} written`;
}

// ✅ Clear task box
function clearNotes() {
  notesBox.value = "";
  notesRef.set("");
  updateCount();
}
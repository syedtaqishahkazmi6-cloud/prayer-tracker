// Initialize Firebase Realtime Database
const db = firebase.database();

// Define prayer names and weekdays
const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Save and load notes
document.querySelectorAll('textarea').forEach((textarea, index) => {
    const ref = db.ref(`notes/note${index}`);
    ref.once('value').then(snapshot => {
        if (snapshot.exists()) {
            textarea.value = snapshot.val();
        }
    });
    textarea.addEventListener('input', () => {
        ref.set(textarea.value);
    });
});

// Save and load checkboxes using structured paths
const rows = document.querySelectorAll('tbody tr');
rows.forEach((row, rowIndex) => {
    const prayer = prayers[rowIndex];
    row.querySelectorAll('input[type="checkbox"]').forEach((checkbox, colIndex) => {
        const day = weekdays[colIndex];
        const ref = db.ref(`attendance/${prayer}/${day}`);

        // Load saved state
        ref.once('value').then(snapshot => {
            if (snapshot.exists()) {
                checkbox.checked = snapshot.val();
            }
        });

        // Save on change
        checkbox.addEventListener('change', () => {
            ref.set(checkbox.checked);
        });
    });
});

// Clear all notes
function clearNotes() {
    document.querySelectorAll('textarea').forEach((textarea, index) => {
        textarea.value = '';
        db.ref(`notes/note${index}`).set('');
    });
}

// Clear checkboxes for a specific day (column)
function clearColumn(colIndex) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, rowIndex) => {
        const prayer = prayers[rowIndex];
        const day = weekdays[colIndex];
        const cell = row.cells[colIndex + 1]; // +1 to skip prayer name column
        const checkbox = cell.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = false;
            db.ref(`attendance/${prayer}/${day}`).set(false);
        }
    });
}
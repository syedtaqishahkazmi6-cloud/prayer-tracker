const db = firebase.database();

// Prayer names and weekdays
const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Save and load notes
document.querySelectorAll('textarea').forEach((textarea, index) => {
    const ref = db.ref(`notes/note${index}`);
    ref.once('value').then(snapshot => {
        if (snapshot.exists()) textarea.value = snapshot.val();
    });
    textarea.addEventListener('input', () => {
        ref.set(textarea.value);
    });
});

// Save and load checkboxes with structured paths
const rows = document.querySelectorAll('tbody tr');
rows.forEach((row, rowIndex) => {
    const prayer = prayers[rowIndex];
    row.querySelectorAll('input[type="checkbox"]').forEach((checkbox, colIndex) => {
        const day = weekdays[colIndex];
        const ref = db.ref(`attendance/${prayer}/${day}`);

        // Load
        ref.once('value').then(snapshot => {
            if (snapshot.exists()) checkbox.checked = snapshot.val();
        });

        // Save
        checkbox.addEventListener('change', () => {
            ref.set(checkbox.checked);
        });
    });
});

// Clear notes
function clearNotes() {
    document.querySelectorAll('textarea').forEach((textarea, index) => {
        textarea.value = '';
        db.ref(`notes/note${index}`).set('');
    });
}

// Clear checkboxes for a specific day
function clearColumn(colIndex) {
    rows.forEach((row, rowIndex) => {
        const prayer = prayers[rowIndex];
        const day = weekdays[colIndex];
        const checkbox = row.cells[colIndex + 1].querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = false;
            db.ref(`attendance/${prayer}/${day}`).set(false);
        }
    });
}
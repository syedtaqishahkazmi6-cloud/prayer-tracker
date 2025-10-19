const db = firebase.database();

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

// Save and load checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
    const ref = db.ref(`attendance/box${index}`);
    ref.once('value').then(snapshot => {
        if (snapshot.exists()) checkbox.checked = snapshot.val();
    });
    checkbox.addEventListener('change', () => {
        ref.set(checkbox.checked);
    });
});

// Clear all notes
function clearNotes() {
    document.querySelectorAll('textarea').forEach((textarea, index) => {
        textarea.value = '';
        db.ref(`notes/note${index}`).set('');
    });
}

// Clear checkboxes in a specific column (0 = Monday, 1 = Tuesday, ...)
function clearColumn(colIndex) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, rowIndex) => {
        const checkbox = row.cells[colIndex + 1].querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = false;
            const flatIndex = rowIndex * 7 + colIndex;
            db.ref(`attendance/box${flatIndex}`).set(false);
        }
    });
}
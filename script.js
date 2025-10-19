// Initialize Firebase Realtime Database
const db = firebase.database();

// Save and load notes
document.querySelectorAll('textarea').forEach((textarea, index) => {
    const ref = db.ref(`notes/note${index}`);

    // Load saved note
    ref.once('value').then(snapshot => {
        if (snapshot.exists()) {
            textarea.value = snapshot.val();
        }
    });

    // Save on input
    textarea.addEventListener('input', () => {
        ref.set(textarea.value);
    });
});

// Save and load checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
    const ref = db.ref(`attendance/box${index}`);

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

// Clear attendance
function clearAttendance() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
        checkbox.checked = false;
        db.ref(`attendance/box${index}`).set(false);
    });
}

// Clear notes
function clearNotes() {
    document.querySelectorAll('textarea').forEach((textarea, index) => {
        textarea.value = '';
        db.ref(`notes/note${index}`).set('');
    });
}
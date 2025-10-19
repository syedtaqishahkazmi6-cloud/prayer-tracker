// Save and restore checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
    const key = `checkbox${index}`;
    checkbox.checked = localStorage.getItem(key) === 'true';
    checkbox.addEventListener('change', () => {
        localStorage.setItem(key, checkbox.checked);
    });
});

// Save and restore textareas
document.querySelectorAll('textarea').forEach((textarea, index) => {
    const key = `textarea${index}`;
    textarea.value = localStorage.getItem(key) || '';
    textarea.addEventListener('input', () => {
        localStorage.setItem(key, textarea.value);
    });
});

// Save and restore editable headings
document.querySelectorAll('h2[contenteditable]').forEach((heading, index) => {
    const key = `heading${index}`;
    heading.innerText = localStorage.getItem(key) || heading.innerText;
    heading.addEventListener('input', () => {
        localStorage.setItem(key, heading.innerText);
    });
});

// Clear attendance checkboxes
function clearAttendance() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
        checkbox.checked = false;
        localStorage.removeItem(`checkbox${index}`);
    });
}

// Clear all notes and headings
function clearNotes() {
    document.querySelectorAll('textarea').forEach((textarea, index) => {
        textarea.value = '';
        localStorage.removeItem(`textarea${index}`);
    });
    document.querySelectorAll('h2[contenteditable]').forEach((heading, index) => {
        heading.innerText = `${index + 1}. Your Heading`;
        localStorage.removeItem(`heading${index}`);
    });
}
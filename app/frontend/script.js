// Zmień ten URL, jeśli Twój backend działa na innym porcie lub adresie
const API_URL = 'http://localhost:5001/api/notes'; 

async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const notes = await response.json();
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = ''; // Clear existing notes
        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${note.id} - ${note.content}`;
            notesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '<li>Error loading notes. Is the backend running?</li>';
    }
}

async function addNote() {
    const content = document.getElementById('noteContent').value;
    if (!content.trim()) {
        alert('Note content cannot be empty!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        document.getElementById('noteContent').value = ''; // Clear textarea
        fetchNotes(); // Refresh the list of notes
    } catch (error) {
        console.error('Error adding note:', error);
        alert(`Error adding note: ${error.message}`);
    }
}

// Fetch notes when the page loads
document.addEventListener('DOMContentLoaded', fetchNotes);
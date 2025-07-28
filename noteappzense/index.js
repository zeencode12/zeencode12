import { sampleNotes } from './sample-note.js';
import './note-item.js';
import './note-form.js';
import './note-list.js';

const notesListElement = document.querySelector('#notesList');
const noteFormElement = document.createElement('note-form');
const noteListElement = document.createElement('note-list');

// Add custom elements to the page
notesListElement.appendChild(noteFormElement);
notesListElement.appendChild(noteListElement);

// Function to render notes
function renderNotes() {
  // Sort notes so that the newest is first
  const sortedNotes = [...sampleNotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  noteListElement.setNotes(sortedNotes);
}

// Initialize notes list
renderNotes();

// Add note
noteFormElement.addEventListener('add-note', (event) => {
  const { title, body } = event.detail;
  
  const newNoteId = `notes-${Date.now()}`;
  const newNote = {
    id: newNoteId,
    title: title,
    body: body,
    createdAt: new Date().toISOString(),
    archived: false,
  };
  
  sampleNotes.push(newNote);
  renderNotes();
});

// Delete note
noteListElement.addEventListener('delete-note', (event) => {
  const noteId = event.detail.id;
  const index = sampleNotes.findIndex(note => note.id === noteId);
  
  if (index !== -1) {
    sampleNotes.splice(index, 1);
    renderNotes();
  }
});

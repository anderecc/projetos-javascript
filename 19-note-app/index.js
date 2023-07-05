let $btn = document.querySelector('.button');
let $noteContainer = document.querySelector('.note-container');

let notesValues = [];

$btn.addEventListener('click', newNote);

function getNotes() {
    notesValues = JSON.parse(localStorage.getItem('notes'));
    if (notesValues) {
        notesValues.forEach((note) => {
            let nNote = document.createElement('textarea');
            nNote.classList.add('note');
            nNote.innerText = note;
            $noteContainer.appendChild(nNote);
        });
    } else {
        notesValues = [];
    }
}
getNotes();

function newNote() {
    let note = document.createElement('textarea');
    note.classList.add('note');
    $noteContainer.appendChild(note);
}

function setNotes() {
    let $notes = document.querySelectorAll('.note');
    $notes.forEach((note, index) => {
        notesValues.splice(index, notesValues.length, note.value);
        localStorage.setItem('notes', JSON.stringify(notesValues));
    });
}

document.addEventListener('keyup', () => {
    setNotes();
});

document.addEventListener('dblclick', (e) => {
    if (e.target.className == 'note') {
        let remove = window.confirm('Do you really want to remove the note?');
        if (remove) {
            e.target.parentNode.removeChild(e.target);
            setNotes();
        }
    }
});

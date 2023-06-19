import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import Notes from "./Notes";
import { Container } from "react-bootstrap";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("https://6421757f34d6cd4ebd73c342.mockapi.io/todo");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleNoteCreated = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const handleNoteCompleted = async (noteId, completed) => {
    try {
      const note = notes.find((n) => n.id === noteId);
      const updatedNote = { ...note, completed };

      await fetch(`https://6421757f34d6cd4ebd73c342.mockapi.io/todo/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedNote)
      });

      const updatedNotes = notes.map((note) =>
        note.id === noteId ? { ...note, completed } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleNoteDeleted = async (noteId) => {
    try {
      await fetch(`https://6421757f34d6cd4ebd73c342.mockapi.io/todo/${noteId}`, {
        method: "DELETE"
      });

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Container  className="note ">
      
      <NoteForm className="noteform" onNoteCreated={handleNoteCreated} />
      <Notes className="notes"
        notes={notes}
        onNoteCompleted={handleNoteCompleted}
        onNoteDeleted={handleNoteDeleted}
      />
    </Container>
  );
};

export default App;


import React from "react";
import { Container,  Checkbox, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { InputGroup } from "react-bootstrap";

const Notes = ({ notes, onNoteCompleted, onNoteDeleted }) => {
  const handleCompleted = async (noteId) => {
    try {
      const note = notes.find((n) => n.id === noteId);
      const updatedNote = { ...note, completed: !note.completed };

      await fetch(`https://6421757f34d6cd4ebd73c342.mockapi.io/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedNote)
      });

      onNoteCompleted(noteId, updatedNote.completed);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const note = notes.find((n) => n.id === noteId);

      if (note.completed) {
        await fetch(`https://6421757f34d6cd4ebd73c342.mockapi.io/notes/${noteId}`, {
          method: "DELETE"
        });

        onNoteDeleted(noteId);
      } else {
        alert("Mission Uncompletedı.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  return (
    
  <Container fluid  className=" mb-3 " >
    {notes.map((note) => (
      <InputGroup className="mb-3  " key={note.id}>
        <Button
       
          variant="contained"
          sx={{width: '64%',  backgroundColor: "white", color: "black" }}
          style={{
            textDecoration: note.completed ? "line-through" : "none",
            textDecorationColor: note.completed ? 'red' : 'initial',
            textDecorationThickness: note.completed ? '4px' : 'initial',
          }}
        >
          {note.title}
        </Button>

        <Button
          variant="contained"
          color={note.completed ? "success" : "warning"}
          onClick={() => handleCompleted(note.id)}
          startIcon={
            <Checkbox
              checked={note.completed}
              onChange={() => handleCompleted(note.id)}
              sx={{
                '&.Mui-checked': {
                  color: 'green'
                }
              }}
            />
          }
          sx={{ width: '18%' }}
        >
          OK
        </Button>

        <Button
       size="small"
          variant="contained"
          color="error"
          onClick={() => handleDelete(note.id)}
          startIcon={<Delete />}
          sx={{ width: '18%' }}
        >
          Delete
        </Button>
      </InputGroup>
    ))}
  </Container>





  );
};

export default Notes;


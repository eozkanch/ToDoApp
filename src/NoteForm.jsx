import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";

const NoteForm = ({ onNoteCreated }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://6421757f34d6cd4ebd73c342.mockapi.io/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          completed: false
        })
      });

      const data = await response.json();
      onNoteCreated(data);
      setTitle("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <Container>
    
    <Form className="mb-3 "onSubmit={handleSubmit} size="sm">
    <InputGroup className="mb-3 " >
   
    <Form.Control  
          size="lg"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a note title"
          required
     />
   
        <Button variant="warning" id="button-addon2"   type="submit">
        Create Note
        </Button>
      </InputGroup>
      </Form>
    </Container>
  );
};

export default NoteForm;

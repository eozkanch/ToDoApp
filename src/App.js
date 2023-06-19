
import 'bootstrap/dist/css/bootstrap.min.css';
import'./App.css';
import Note from './Note';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid className="App ">
    <h1 className="tilt">My To Do List</h1>
    <p className='content'>
    To-Do lists are an indispensable tool for making our daily lives more organized. We can use them to plan, prioritize, and organize our tasks. To-Do lists help reduce forgetfulness and keep us more organized. By checking off completed tasks, we feel motivated and can observe our progress. Additionally, by using To-Do lists, we can manage our time more efficiently. By seeing our tasks clearly, we can make better use of our free time and progress towards our goals more quickly. To-Do lists enable us to manage our lives in a more organized, planned, and effective manner.</p>
      <Note/>
    </Container>
  );
}

export default App;

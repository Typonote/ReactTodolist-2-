import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [id,setId] = useState(0);


  useEffect(() => {
      axios.get("http://localhost:5000/todo").then((response) => {
        console.log(response.data);
        setTodos(response.data);
        setId(response.data.length);
      });
  }, [])


  const handleClick = () => {
    axios.post("http://localhost:5000/todo", { todo: text,id: id });

    setTodos([
      ...todos,
      {
        id: id,
        todo: text,
      },
    ]);
    setId(id + 1);
    setText("")
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(element => element.id !== id));
    axios.post("http://localhost:5000/delete", {
      id,
    });
  }


  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="button" value="추가" onClick={handleClick} />
      {todos.map((element) => {
        return (
          <>
            <p>{element.todo}</p>
            <input type="button" value="완료" onClick={() => deleteTodo(element.id)} />
          </>
        );
      })}
    </div>
  );
}

export default App;
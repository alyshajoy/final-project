import React from "react";
import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import ListItems from "./ListItems";

const ListContainer = () => {

  useEffect (() => {
    fetch('http://localhost:3001/api/tasks')
    .then((res) => res.json())
    .then((data) => {
      setTodo(data);
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
    });
  }, []);

  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  const handleAdd = () => {
    console.log('Add');
    const copy = [...todo, {title: value}];
    setTodo(copy);
    setValue("");
  }

  const handleDelete = (id) => {
    // console.log('Deleted!')
  }

  const items = [
    {id: 1, title:'Banana'}, 
    {id: 2,title:'Chocolate'}, 
    {id: 3,title:'Strawberry'}
  ];

  return (
    <>
      <div>
        <ListHeader />
      </div>
      <form>
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add</button>
      </form>
      <div>
        <ListItems items={items} handleDelete={handleDelete} todo={todo}/>
      </div>
      <div>
        <ListFooter />
      </div>
    </>
  );
};

export default ListContainer;
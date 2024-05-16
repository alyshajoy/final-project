import React from "react";
import ListItem from "./ListItem";

const ListItems = (props) => {

  const {
    tasks, 
    setTasks, 
    value, 
    setValue, 
    handleAdd, 
    handleComplete, 
    handleDelete, 
    complete, 
    setComplete, 
    handleUpdate, 
    sortedTasks, 
    sort
  } = props;

  const sortedMappedList = (tasks) => {
    return sortedTasks.map(task => (
      <ListItem 
        // item={item}
        // key={item.id}
        value={value}
        task={task}
        tasks={tasks}
        key={task.id}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        setValue={setValue}
        setTasks={setTasks}
        handleComplete={handleComplete}
        complete={complete}
        setComplete={setComplete}
        handleUpdate={handleUpdate}
        sort={sort}
      />
    ));
  };

  const mappedList = (tasks) => {
    return tasks.map(task => (
      <ListItem 
        // item={item}
        // key={item.id}
        value={value}
        task={task}
        tasks={tasks}
        key={task.id}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        setValue={setValue}
        setTasks={setTasks}
        handleComplete={handleComplete}
        complete={complete}
        setComplete={setComplete}
        handleUpdate={handleUpdate}
        sort={sort}
      />
    ));
  };

  return (
    <div className="list-items-container">
      <ul className="list-items-container-inner">
       {sort ?sortedMappedList(tasks) :mappedList(tasks)}
      </ul>
    </div>
  );
};

export default ListItems;
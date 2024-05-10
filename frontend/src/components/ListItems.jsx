import React from "react";
import ListItem from "./ListItem";

const ListItems = (props) => {

  const {tasks, setTasks, value, setValue, handleAdd, handleComplete, handleDelete, complete, setComplete, handleUpdate} = props;

  const mappedList = (tasks) => {
    return tasks.map(task => (
      <ListItem 
        // item={item}
        // key={item.id}
        value={value}
        task={task}
        tasks={tasks}
        key={task.task_id}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        setValue={setValue}
        setTasks={setTasks}
        handleComplete={handleComplete}
        complete={complete}
        setComplete={setComplete}
        handleUpdate={handleUpdate}
      />
    ));
  };

  return (
    <div className="list-items-container">
      <ul className="list-items-container-inner">
       {mappedList(tasks)}
      </ul>
    </div>
  );
};

export default ListItems;
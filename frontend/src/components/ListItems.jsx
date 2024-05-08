import React from "react";
import ListItem from "./ListItem";

const ListItems = (props) => {


  const mappedList = (tasks) => {
    return tasks.map(task => (
      <ListItem 
        // item={item}
        // key={item.id}
        value={props.value}
        task={task}
        key={task.task_id}
        handleDelete={props.handleDelete}
        handleAdd={props.handleAdd}
        setValue={props.setValue}
        setTasks={props.setTasks}
        handleComplete={props.handleComplete}
      />
    ));
  };

  return (
    <div className="list-items-container">
      <ul className="list-items-container-inner">
       {mappedList(props.tasks)}
      </ul>
    </div>
  );
};

export default ListItems;
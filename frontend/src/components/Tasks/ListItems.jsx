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
    sort,
    checkedTasks,
    setCheckedTasks
  } = props;

  const sortedMappedList = (tasks) => {
    return sortedTasks.map(task => (
      <ListItem 
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
        checkedTasks={checkedTasks}
        setCheckedTasks={setCheckedTasks}
      />
    ));
  };

  const mappedList = (tasks) => {
    return tasks.map(task => (
      <ListItem 
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
        checkedTasks={checkedTasks}
        setCheckedTasks={setCheckedTasks}
      />
    ));
  };

  return (
    <div className="list-items-container">
      <ul className="list-items-container-inner">
       {sort ? sortedMappedList(tasks) : mappedList(tasks)}
      </ul>
    </div>
  );
};

export default ListItems;
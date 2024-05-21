import React from "react";
import ListItem from "./ListItem";
import {DndContext} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';


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

  // const sortedMappedList = (tasks) => {
  //   return sortedTasks.map(task => (
  //     <ListItem 
  //       value={value}
  //       task={task}
  //       tasks={tasks}
  //       key={task.id}
  //       handleDelete={handleDelete}
  //       handleAdd={handleAdd}
  //       setValue={setValue}
  //       setTasks={setTasks}
  //       handleComplete={handleComplete}
  //       complete={complete}
  //       setComplete={setComplete}
  //       handleUpdate={handleUpdate}
  //       sort={sort}
  //       checkedTasks={checkedTasks}
  //       setCheckedTasks={setCheckedTasks}
  //     />
  //   ));
  // };

  const mappedList = (tasks) => {
    return tasks.map(task => (
      <ListItem 
        value={value}
        task={task}
        tasks={tasks}
        key={task.id}
        id={task.id}
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

  // const handleDragEnd = (event) => {
  //   const {active, over} = event

  //   if (active.id !== over.id) {
  //     setTasks((tasks) => {
  //       const oldIndex = tasks.findIndex((task) => task.id === active.id)
  //       const newIndex = tasks.findIndex((task) => task.id === over.id)

  //       const newTasks = [...tasks];

  //       //remove from old index
  //       newTasks.splice(oldIndex, 1);
  //       //insert the task at a new index
  //       newTasks.splice(newIndex, 0, tasks[oldIndex]);
  //       return newTasks;
  //     })
      
      
  //   }
  // }

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    // Check if the task was dropped outside of any droppable area
    if (!over) {
      return;
    }
  
    // Check if the task was dropped in a new position
    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
  
        // Create a new array with reordered tasks
        const newTasks = [...tasks];
        const [movedTask] = newTasks.splice(oldIndex, 1); // Remove the task from the old index
        newTasks.splice(newIndex, 0, movedTask); // Insert the task at the new index
  
        return newTasks;
      });
    }
  };
  

  return (
    <div className="list-items-container">
      <DndContext onDragEnd={handleDragEnd} tasks={tasks}>
      <SortableContext items = {tasks.map((task) => task.id)} >
      <ul className="list-items-container-inner">
       <li>{mappedList(tasks)}</li>
      </ul>
      </SortableContext>
      </DndContext>
    </div>
  );
};

export default ListItems;
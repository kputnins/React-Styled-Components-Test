import React from 'react';
import { arrayOf, shape, string, bool, func } from 'prop-types';
import Task from './task';

const TaskList = ({ listData, onTaskChange }) => {
  const onTaskClick = inputName => {
    const newTaskList = listData.tasks.map((task, i) => {
      if (`${i}_${task.label}` === inputName)
        return { ...task, done: !task.done };
      return { ...task };
    });
    onTaskChange({ id: listData.id, newTaskList });
  };

  const onTaskRemove = inputName => {
    const newTaskList = [...listData.tasks].filter(
      (task, i) => `${i}_${task.label}` !== inputName,
    );
    onTaskChange({ id: listData.id, newTaskList });
  };

  return listData.tasks.map((task, i) => (
    <Task
      key={`${i + 1}_${task.label}`}
      label={task.label}
      done={task.done}
      inputName={`${i}_${task.label}`}
      onTaskClick={onTaskClick}
      onTaskRemove={onTaskRemove}
    />
  ));
};

TaskList.propTypes = {
  listData: shape({
    createdAt: string.isRequired,
    name: string.isRequired,
    tasks: arrayOf(
      shape({
        label: string,
        done: bool,
      }),
    ).isRequired,
  }).isRequired,
  onTaskChange: func.isRequired,
};

export default TaskList;

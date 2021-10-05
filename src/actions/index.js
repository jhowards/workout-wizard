export const addTaskAction = (taskToAdd) => ({
  type: "ADD_TASK",
  payload: taskToAdd,
});

export const archiveTaskAction = (taskToArchive) => ({
  type: "SET_TASK_ARCHIVED",
  payload: taskToArchive,
});

export const removeTaskAction = (id) => ({
  type: "REMOVE_TASK",
  payload: id,
});

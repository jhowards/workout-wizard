export const addTaskAction = (taskToAdd) => ({
  type: "ADD_TASK",
  payload: taskToAdd,
});

export const archiveTaskAction = (taskToArchive) => ({
  type: "SET_TASK_ARCHIVED",
  payload: taskToArchive,
});

export const removeTaskAction = (index) => ({
  type: "REMOVE_TASK",
  payload: index,
});

// export const backButtonAction = (boolean) => ({
//   type: "BACK_BUTTON_PRESSED",
//   payload: boolean,
// });

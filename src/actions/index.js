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

export const editTaskAction = (taskToEdit) => ({
  type: "EDIT_TASK",
  payload: taskToEdit,
});

export const reorderTaskAction = (taskToReorder) => ({
  type: "REORDER_TASKS",
  payload: taskToReorder,
});

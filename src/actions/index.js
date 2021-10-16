export const addTaskAction = (taskToAdd) => ({
  type: "ADD_TASK",
  payload: taskToAdd,
});

export const loginAction = () => ({
  type: "LOG_IN",
});

export const logoutAction = () => ({
  type: "LOG_OUT",
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

export const autoScheduleAction = (tasksToSchedule) => ({
  type: "AUTO_SCHEDULE",
  payload: tasksToSchedule,
});

export const addGoalAction = (goalToAdd) => ({
  type: "ADD_GOAL",
  payload: goalToAdd,
});

export const removeGoalAction = (id) => ({
  type: "REMOVE_GOAL",
  payload: id,
});

export const setDateAction = (date) => ({
  type: "SET_DATE",
  payload: date,
});

export const removeDateAction = (i) => ({
  type: "REMOVE_DATE",
  payload: i,
});

export const goalCompletionAction = (goal) => ({
  type: "GOAL_COMPLETION",
  payload: goal,
});

export const editGoalAction = (goalToEdit) => ({
  type: "EDIT_GOAL",
  payload: goalToEdit,
});

export const clearTasksAction = () => ({
  type: "CLEAR_TASKS",
});

export const clearGoalsAction = () => ({
  type: "CLEAR_GOALS",
});

export const addRoutineAction = (routineToAdd) => ({
  type: "ADD_ROUTINE",
  payload: routineToAdd,
});

export const removeRoutineAction = (id) => ({
  type: "REMOVE_ROUTINE",
  payload: id,
});

export const addRoutineTasksAction = (taskToAdd) => ({
  type: "ADD_ROUTINE_TASKS",
  payload: taskToAdd,
});

export const removeRoutineTasksAction = (id) => ({
  type: "REMOVE_ROUTINE_TASKS",
  payload: id,
});

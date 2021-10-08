import { initialState } from "../store";

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "EDIT_TASK":
      const editindex = state.tasks.findIndex(
        (task) => task.id == action.payload.id
      );
      const newArrayEdit = [...state.tasks];
      newArrayEdit[editindex].task = action.payload.task;
      newArrayEdit[editindex].duration = action.payload.duration;
      newArrayEdit[editindex].date = action.payload.date;
      return {
        ...state,
        tasks: newArrayEdit,
      };

    case "REORDER_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "SET_TASK_ARCHIVED":
      const index = state.tasks.findIndex((task) => task.id == action.payload);
      const newArray = [...state.tasks];
      if (newArray[index].archived) {
        newArray[index].archived = false;
      } else {
        newArray[index].archived = true;
      }
      return {
        ...state,
        tasks: newArray,
      };

    case "REMOVE_TASK":
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
      };

    case "ADD_GOAL":
      return {
        ...state,
        goals: [...state.goals, action.payload],
      };

    case "REMOVE_GOAL":
      const filteredGoals = state.goals.filter(
        (goal) => goal.id !== action.payload
      );
      return {
        ...state,
        goals: filteredGoals,
      };

    case "SET_DATE":
      return {
        ...state,
        homeCalendarDate: action.payload,
      };

    case "REMOVE_DATE":
      return {
        ...state,
        homeCalendarDate: "",
      };

    default:
      return state;
  }
};

export default tasksReducer;

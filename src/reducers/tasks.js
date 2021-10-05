import { initialState } from "../store";

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "SET_TASK_ARCHIVED":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "REMOVE_TASK":
      return {
        ...state,
        task: state.task.filter((task, i) => i !== action.payload),
      };
    default:
      return state;
  }
};

export default tasksReducer;

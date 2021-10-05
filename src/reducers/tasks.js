import { initialState } from "../store";

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "SET_TASK_ARCHIVED":
      const index = action.payload;
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

    default:
      return state;
  }
};

export default tasksReducer;

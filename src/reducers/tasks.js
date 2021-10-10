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

    case "GOAL_COMPLETION":
      const goalcompleteindex = state.goals.findIndex(
        (goal) => goal.id == action.payload.id
      );
      const subtasksamount = Object.keys(
        state.goals[goalcompleteindex].subtasks
      ).length;
      let percent = 100 / subtasksamount;
      const completeGoalArray = [...state.goals];

      for (let i = -1; i < subtasksamount; i++) {
        if (action.payload.count === i) {
          let percentToSet = percent * (i + 1);
          completeGoalArray[goalcompleteindex].percentage = percentToSet;
          if (percentToSet === 100) {
            completeGoalArray[goalcompleteindex].completed = true;
          } else {
            completeGoalArray[goalcompleteindex].completed = false;
          }
        }
      }
      completeGoalArray[goalcompleteindex].count = action.payload.count;

      return {
        ...state,
        goals: completeGoalArray,
      };

    case "EDIT_GOAL":
      const editgoalindex = state.goals.findIndex(
        (goal) => goal.id == action.payload.id
      );
      const goalArrayEdit = [...state.goals];
      goalArrayEdit[editgoalindex].goal = action.payload.goal;
      goalArrayEdit[editgoalindex].tag = action.payload.tag;
      goalArrayEdit[editgoalindex].enddate = action.payload.enddate;
      goalArrayEdit[editgoalindex].subtasks = action.payload.subtasks;
      const subtasksamountedit = Object.keys(
        goalArrayEdit[editgoalindex].subtasks
      ).length;
      let editpercent = 100 / subtasksamountedit;

      for (let i = -1; i < subtasksamountedit; i++) {
        if (goalArrayEdit[editgoalindex].count === i) {
          let editpercentToSet = editpercent * (i + 1);
          console.log(editpercentToSet);
          goalArrayEdit[editgoalindex].percentage = editpercentToSet;
          if (editpercentToSet === 100) {
            goalArrayEdit[editgoalindex].completed = true;
          } else {
            goalArrayEdit[editgoalindex].completed = false;
          }
        }
      }

      return {
        ...state,
        goals: goalArrayEdit,
      };

    default:
      return state;
  }
};

export default tasksReducer;

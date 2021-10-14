import { initialState } from "../store";
import format from "date-fns/format";

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
      };

    case "LOG_OUT":
      return {
        ...state,
        loggedIn: false,
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "EDIT_TASK":
      const editindex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      const newArrayEdit = [...state.tasks];
      newArrayEdit[editindex].task = action.payload.task;
      newArrayEdit[editindex].duration = action.payload.duration;
      newArrayEdit[editindex].date = action.payload.date;
      newArrayEdit[editindex].icon = action.payload.icon;
      return {
        ...state,
        tasks: newArrayEdit,
      };

    case "REORDER_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "AUTO_SCHEDULE":
      return {
        ...state,
        tasks: action.payload,
      };

    case "SET_TASK_ARCHIVED":
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      const newArray = [...state.tasks];

      if (newArray[index].archived) {
        newArray[index].archived = false;
      } else {
        newArray[index].archived = true;
        if (newArray[index].active === true) {
          newArray[index].active = false;

          let grabDate = new Date(newArray[index].date);
          let formatCurrentDate = format(grabDate, "P");
          let filteredDateArray = state.tasks.filter(
            (el) => el.date === formatCurrentDate
          );
          const newindex = filteredDateArray.findIndex(
            (task) => task.id === action.payload
          );
          if (filteredDateArray[newindex + 1]) {
            let nextID = filteredDateArray[newindex + 1].id;
            const nextIDindex = state.tasks.findIndex(
              (task) => task.id === nextID
            );
            if (filteredDateArray[newindex + 1].archived !== true) {
              newArray[nextIDindex].active = true;
            } else {
              if (newArray[nextIDindex + 1]) {
                if (newArray[nextIDindex + 1].archived !== true) {
                  newArray[nextIDindex + 1].active = true;
                } else {
                  if (newArray[nextIDindex + 2]) {
                    if (newArray[nextIDindex + 2].archived !== true) {
                      newArray[nextIDindex + 2].active = true;
                    } else {
                      if (newArray[nextIDindex + 3]) {
                        if (newArray[nextIDindex + 3].archived !== true) {
                          newArray[nextIDindex + 3].active = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        tasks: newArray,
      };

    case "CLEAR_TASKS":
      const clearTasksArray = [];
      return {
        ...state,
        tasks: clearTasksArray,
      };

    case "CLEAR_GOALS":
      const clearGoalsArray = [];
      return {
        ...state,
        goals: clearGoalsArray,
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
        (goal) => goal.id === action.payload.id
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
            completeGoalArray.sort(function (a, b) {
              return a.completed - b.completed;
            });
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
        (goal) => goal.id === action.payload.id
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

    case "ADD_ROUTINE":
      return {
        ...state,
        routines: [...state.routines, action.payload],
      };

    default:
      return state;
  }
};

export default mainReducer;

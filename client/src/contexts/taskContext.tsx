import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type Project = {
  id: number;
  name: string;
};
type Task = {
  id: number;
  name: string;
  status: boolean;
  projects: Project;
};

type State = {
  [index: string]: Array<Task>;
};
type Action =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'REMOVE_TASK'; task: Task }
  | { type: 'UPDATE_TASK'; task: Task };

type TaskDispatch = Dispatch<Action>;

const TaskStateContext = createContext<State | null>(null);
const TaskDispatchContext = createContext<TaskDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TASK':
      if (Object.keys(state).includes(action.task.projects.name)) {
        state[action.task.projects.name].push(action.task);
        return { ...state };
      } else {
        state[action.task.projects.name] = [action.task];
        return { ...state };
      }
    case 'REMOVE_TASK':
      if (Object.keys(state).includes(action.task.projects.name)) {
        state[action.task.projects.name] = state[action.task.projects.name].filter(
          (el) => el.id !== action.task.id,
        );
        return { ...state };
      } else {
        throw new Error('invalid project name');
      }
    case 'UPDATE_TASK':
      if (Object.keys(state).includes(action.task.projects.name)) {
        state[action.task.projects.name] = state[action.task.projects.name].map((el) => {
          if (el.id === action.task.id) {
            el.name = action.task.name;
            el.status = action.task.status;
            return el;
          } else {
            return el;
          }
        });
        return { ...state };
      } else {
        throw new Error('invalid project name');
      }
    default:
      throw new Error('unhandled action');
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTaskState() {
  const state = useContext(TaskStateContext);
  if (!state) throw new Error('Cannot find TaskProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useTaskDispatch() {
  const dispatch = useContext(TaskDispatchContext);
  if (!dispatch) throw new Error('Cannot find TaskProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}

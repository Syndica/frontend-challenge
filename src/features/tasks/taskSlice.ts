import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types';
import { fetchTasks, addTask, toggleTask, removeTask } from '../../lib/fakeApi';

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAllTasks = createAsyncThunk('tasks/fetchAll', fetchTasks);
export const addNewTask = createAsyncThunk('tasks/add', addTask);
export const toggleTaskStatus = createAsyncThunk('tasks/toggle', toggleTask);
export const deleteTask = createAsyncThunk('tasks/delete', removeTask);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load tasks';
      })
      .addCase(addNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action: PayloadAction<Task>) => {
        console.log('Toggling task:', action.payload);
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
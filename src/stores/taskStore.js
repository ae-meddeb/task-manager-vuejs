import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    filtredTasks: [],
    selectedTasks: [],
    editTask: {},
    taskFilterText: ""
  },
  getters: {
    getFiltredTasks: (state) =>
      state.tasks.filter(
        (task) => task.name.toLowerCase().indexOf(state.taskFilterText) > -1
      ),
    getEditTask: (state) => state.editTask,
    getTaskFilterText: (state) => state.taskFilterText,
    getSelectedTasksCount: (state) => state.selectedTasks.length
  },
  mutations: {
    ADD_TASK: (state, task) => {
      state.tasks = [task, ...state.tasks];
    },
    DELETE_TASK: (state, taskId) => {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    UPDATE_TASK: (state, newTask) => {
      state.tasks = state.tasks.map((task) =>
        task.id === newTask.id ? { ...task, ...newTask } : task
      );
    },
    SET_EDIT_TASK: (state, task) => {
      state.editTask = { ...task };
    },
    SET_FILTER_TEXT: (state, text) => {
      state.taskFilterText = text;
    },
    SET_SELECTED_TASKS: (state, tasks) => {
      state.selectedTasks = [...tasks];
    },
    DELETE_SELECTED_TASKS: (state) => {
      state.tasks = state.tasks.filter(
        (task) => !state.selectedTasks.find((t) => t.id === task.id)
      );
    }
  },
  actions: {
    addTask: (store, task) => {
      const id = Date.now();
      store.commit("ADD_TASK", { id, ...task });
    },
    deleteTask: (store, tasks) => {
      store.commit("DELETE_TASK", tasks);
    },
    updateTask: (store, task) => {
      store.commit("UPDATE_TASK", task);
    },
    setEditTask: (store, task) => {
      store.commit("SET_EDIT_TASK", task);
    },
    setFilterText: (store, text) => {
      store.commit("SET_FILTER_TEXT", text);
    },
    setSelectedTasks: (store, tasks) => {
      store.commit("SET_SELECTED_TASKS", tasks);
    },
    deleteSelectedTasks: (store) => {
      store.commit("DELETE_SELECTED_TASKS");
    }
  },
  strict: true
});

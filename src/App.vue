<template>
  <b-container>
    <Header />
    <Tasks :list="tasks" />
    <b-modal hide-footer id="create-task" title="CREATION">
      <TaskForm modal="create-task" />
    </b-modal>
    <b-modal hide-footer id="update-task" title="MODIFICATION">
      <TaskForm modal="update-task" :task="editTask" />
    </b-modal>
  </b-container>
</template>

<script>
import taskStore from "./stores/taskStore";
import { mapGetters } from "vuex";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";

export default {
  name: "App",
  store: taskStore,
  components: {
    Tasks,
    Header,
    TaskForm,
  },
  computed: {
    ...mapGetters({ tasks: "getFiltredTasks", editTask: "getEditTask" }),
  },
  methods: {},
};
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>

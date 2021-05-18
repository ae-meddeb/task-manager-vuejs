<template>
  <header class="row">
    <h5 class="col">Gestionnaire de tâches</h5>
    <div class="col header-form">
      <b-form-input v-model="filterText" placeholder="Recherche"></b-form-input>
      <b-button
        v-if="selectedTasksCount < 1"
        v-b-modal.create-task
        :variant="buttonVariant"
        >Ajouter</b-button
      >
      <b-button
        v-if="selectedTasksCount > 0"
        @click="handleDelete()"
        :variant="buttonVariant"
        >Supprimer</b-button
      >
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  confirmModalText,
  confirmModalOptions,
} from "../helpers/confirmModalHelper";

export default {
  name: "Header",
  components: {},
  computed: {
    ...mapGetters({
      taskFilterText: "getTaskFilterText",
      selectedTasksCount: "getSelectedTasksCount",
    }),
    filterText: {
      get() {
        return this.taskFilterText;
      },
      set(text) {
        this.setFilterText(text);
      },
    },
    buttonVariant() {
      return this.selectedTasksCount ? "danger" : "outline-primary";
    },
  },
  methods: {
    ...mapActions(["setFilterText", "deleteSelectedTasks"]),
    handleDelete() {
      this.$bvModal
        .msgBoxConfirm(confirmModalText, confirmModalOptions)
        .then((value) => {
          if (value) {
            this.deleteSelectedTasks();
          }
        });
    },
  },
};
</script>

<style scoped>
header {
  height: 100px;
  align-items: center;
  justify-content: center;
}
button {
  margin-left: 15px;
}
.header-form {
  display: flex;
}
</style>
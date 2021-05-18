<template>
  <section class="task-list">
    <b-table
      selectable
      select-mode="multi"
      :items="list"
      :fields="tableFields"
      @row-selected="onRowSelected"
    >
      <template #cell(date)="row">
        {{ row.value | formatDate }}
      </template>

      <template #cell(actions)="row">
        <b-button
          variant="success"
          size="sm"
          @click="openModal(row.item)"
          class="mr-1"
        >
          Modifier
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="handleDelete(row.item.id)"
          class="mr-1"
        >
          Supprimer
        </b-button>
      </template>

      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <p class="" v-if="!list.length">Pas de tâches</p>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import {
  confirmModalText,
  confirmModalOptions,
} from "../helpers/confirmModalHelper";

export default {
  name: "Tasks",
  data: () => {
    return {
      tableFields: [
        {
          key: "selected",
          label: "",
        },
        {
          key: "name",
          label: "Nom",
        },
        {
          key: "description",
          label: "Description",
        },
        {
          key: "date",
          label: "Date",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
    };
  },
  props: {
    list: Array,
  },
  methods: {
    ...mapActions(["deleteTask", "setEditTask", "setSelectedTasks"]),
    openModal(task) {
      this.setEditTask(task);
      this.$bvModal.show("update-task");
    },
    handleDelete(taskId) {
      this.$bvModal
        .msgBoxConfirm(confirmModalText, confirmModalOptions)
        .then((value) => {
          if (value) {
            this.deleteTask(taskId);
          }
        });
    },
    onRowSelected(tasks) {
      this.setSelectedTasks(tasks);
    },
  },
};
</script>
<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Nom:*" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="formData.name"
          type="text"
          placeholder="Nom de la tâche"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="formData.description"
          placeholder="Description de la tâche"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Date:" label-for="datepicker">
        <b-form-datepicker
          id="datepicker"
          v-model="formData.date"
          placeholder="Date de la tâche"
          :min="new Date()"
          value-as-date
          locale="fr"
        ></b-form-datepicker>
      </b-form-group>
      <b-button type="submit" variant="primary">Enregistrer</b-button>
      <b-button type="button" variant="danger" @click="$bvModal.hide(modal)"
        >Annuler</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    modal: String,
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    formData() {
      return { ...this.task };
    },
  },
  methods: {
    ...mapActions(["addTask", "updateTask"]),

    onSubmit(event) {
      if (this.formData.id) {
        this.updateTask(this.formData);
      } else {
        this.addTask(this.formData);
      }

      this.$bvModal.hide(this.modal);
    },
  },
};
</script>
<style scoped>
button {
  margin-right: 10px;
}
</style>
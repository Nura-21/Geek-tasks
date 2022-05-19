<template>
  <div class="form-input">
    <label for="firstname"
      >First name:
      <input type="text" id="firstname" v-model="firstName" />
    </label>
    <label for="secondname"
      >Second name:
      <input type="text" id="secondname" v-model="secondName" />
    </label>
    <h2>{{ fullName }}</h2>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  data: () => ({
    firstName: "Insert",
    secondName: "Something",
  }),
  computed: {
    fullName: {
      get() {
        return `${this.firstName} ${this.secondName}`;
      },
    },
  },
};
</script>

<style></style>

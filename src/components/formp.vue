<template>
  <v-form ref="createA" v-model="valid" @submit.prevent="submit">
    <v-container class="pt-0">
      <p class="desc">Simple Front-end data validation 
        <a class=".text-caption" href="https://github.com/FredySandoval/frontend-database-fredy.dev" target="_blank"> check code on github</a>
      </p>
      <!-- first name last name-->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- email and date-->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Date of birth"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <!-- Password -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Account Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password2"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              rules.required,
              rules.must,
              rules.emailMatch(password, password2),
            ]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Re-type Account Password"
            hint="At least 8 characters"
            counter
            outlined
            @click:append="show1 = !show1"
          >
          </v-text-field>
          <!-- Progress var -->
          <v-progress-linear
            :value="progress"
            absolute
            height="2"
            :color="color"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <!-- submit -->
      <div class="d-flex justify-center">
        <v-btn
          type="submit"
          :disabled="!valid"
          color="success"
          class="mr-6"
          x-large
        >
          Create new account
        </v-btn>
      </div>
    </v-container>
    <v-alert class="txtcenter" :type="type" v-if="isalert">{{ alertmessage }}</v-alert>
  </v-form>
</template>
<script>
// const URLs = "http://localhost:3000/auth/signup"

import { eventBus } from "../main.js";
export default {
  name: "formp",
  data: () => ({
    type: "success",
    isalert: false,
    alertmessage: "no data available",
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /(^\w.*@\w+\.\w)/.test(v) || "E-mail must be valid",
    ],
    date: null,
    menu: false,

    show1: false,
    password: "",
    password2: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
      must: (v) => (v && v.length >= 8) || "Password must match",
      emailMatch: (v1, v2) =>
        v1 == v2 || `The password you entered don't match`,
    },
    value: "",
    custom: true,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    submit() {
      const users = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        dateofbirth: this.date,
        password: this.password,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
      };

      fetch("https://database.fredy.dev/auth/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.message);

          if (data.message !== "User Added") {
            this.alertmessage = "Error: " + data.message;
            this.type = "error";
          } else {
            this.type = "success";
            this.alertmessage = 'Success: '+data.message;
            eventBus.$emit("fireMethod", data);
          }

          this.isalert = true;
        
        })
        .catch((error) => {
          console.error("Error:", error);
          this.alertmessage = "error: " + data.message;
          this.type = "error";
          this.isalert = true;
        });
      // console.log(users);
      this.$refs.createA.reset();
    },
  },
  computed: {
    checkalerts() {},
    progress() {
      let n = 0;
      let models = [
        this.firstname,
        this.lastname,
        this.email,
        this.email,
        this.date,
        this.password,
        this.password2,
      ];
      let l = Math.ceil(100 / models.length);
      models.forEach((val) => {
        n += val ? l : 0;
      });
      if (n > 99) this.bvalid = true;
      return n;
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    },
  },
};
</script>
<style scoped>
.desc {
  color: gray;
  text-align: center;
  border: 0px;
  margin: 0px;
  padding: 0px;
}
.txtcenter{
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>

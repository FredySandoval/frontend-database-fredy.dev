<template>
  <v-container class="d-flex justify-center">
    <v-card width="800" elevation="24" outlined>
      <h1><v-icon large> mdi-database</v-icon>working database</h1>
      <p class="desc">
        Back-End Data Validationwith 'Joi', password encripted with 'bcript js' 
        <br>With error handling: If email already exists returns an error
      </p>
      <div class="d-flex justify-space-around" style="color: gray">
        <h2>Key:</h2>
        <h2>Value:</h2>
      </div>

      <!--databases-->
      <v-card
        v-for="(item, index) in users"
        :key="index"
        class="mx-auto my-12 col mt-2 mb-2"
        max-width="600"
        elevation="24"
      >
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="(val, index2) in item" :key="index2" class="test">
                <td>{{ index2 }}:</td>
                <td>{{ val }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>

      <!--databases-->
    </v-card>
  </v-container>
</template>

<script>
// const URLs = "http://localhost:3000/auth"
import { eventBus } from "../main.js";

export default {
  name: "databasep",
  data() {
    return {
      users: [],
    };
  },

  methods: {
    myBelovedMethod(val) {
      // console.log("working emit");
      this.users.unshift( val)
    },
  },

  created() {
    fetch("https://database.fredy.dev/auth")
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
      });
    eventBus.$on("fireMethod", (val) => {
      this.myBelovedMethod(val);
    });
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  background-color: rgb(151, 180, 199);
  color: rgb(252, 252, 252);
}
td {
  height: 15px !important;
}

.col {
  border: 1px solid rgb(150, 150, 150);
  border-radius: 15px !important;
}
.test {
  border: 5px solid black !important;
}
.desc {
  text-align: center;
  color: gray;
}
</style>
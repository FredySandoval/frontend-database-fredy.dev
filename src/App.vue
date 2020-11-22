<template>
  <v-app>
    <v-app-bar app color="primary" :hide-on-scroll="hideOnScroll">
      <p>Front-End with Vue and Back-End with Express and NeDB</p>
    </v-app-bar>

    <v-main>
      <LoginPage/>
      <DataBasep/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import LoginPage from "./components/LoginPage"
import DataBasep from "./components/databasep"
// import Databasep from './components/databasep.vue'

export default {
  name: "App",
  components: {
    LoginPage,
    DataBasep
  },

  data: () => ({
    hideOnScroll: false
  }),
  mounted(){
    setTimeout(() => {
      this.hideOnScroll = true;
    }, 3000);
  }
};
</script>
<style scoped>
p {
  padding: 0px;
  margin: 0px;
  font-size: 2vw;
  text-align: center;
  width: 100%;
  color: white;
}
@media only screen and (max-width: 500px) {
  p {
    font-size: 4vw;
  }
}
</style>

<template>
  <v-container class="test d-flex justify-center">
    <v-card width="800" elevation="24" outlined>
      <h1 class="text-center blue1">New Account </h1>
        <formp></formp>
    </v-card>
  </v-container>
</template>

<script>
import formp from './formp'
export default {
  name: "LoginPage",
  components: {
    formp
  },
};
</script>

<style>

.blue1 {
  background-color: rgb(134, 180, 248);
  color: white;
  
  /* -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: rgb(82, 82, 82); */
}
</style>
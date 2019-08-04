<template>
  <v-app>
    <v-container grid-list-md text-center>
      <v-layout wrap>
        <h2>Welcome to SyntaxHighlight please login or signup to view your snippets.</h2>
        <v-flex xs12>
          <v-btn :to="{ name: 'Login' }">Login</v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12>
          <v-btn color="primary" :to="{ name: 'SignUp' }">Sign Up</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style></style>

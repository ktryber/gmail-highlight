<template>
  <v-app>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar dark color="indigo">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="loginUser">
                <v-text-field v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                <v-alert v-if="authFeedback" :value="true" type="error">{{ authFeedback.message }}</v-alert>
                <v-btn type="submit" color="primary">Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['authFeedback']),
  },
  methods: {
    loginUser() {
      this.$store.dispatch('postLogin', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>

<template>
  <v-app>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h1 class="red">test</h1>

      <p class="joke">{{ joke }}</p>
      <v-btn @click="likeJoke" class="md-primary" :disabled="likeButtonDisabled">Like Joke</v-btn>
      <v-btn @click="logJokes" class="md-primary">Log Jokes</v-btn>
      <v-btn @click="clearStorage" class="md-primary">Clear Storage</v-btn>
      <v-btn>Default</v-btn>
    </div>
  </v-app> </template
>>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      joke: '',
      likeButtonDisabled: false,
    };
  },
  methods: {
    likeJoke() {
      chrome.storage.local.get('jokes', res => {
        if (!res.jokes) res.jokes = [];
        res.jokes.push(this.joke);
        chrome.storage.local.set(res);
        this.likeButtonDisabled = true;
      });
    },
    logJokes() {
      chrome.storage.local.get('jokes', res => {
        if (res.jokes) res.jokes.map(joke => console.log(joke));
      });
    },
    clearStorage() {
      chrome.storage.local.clear();
    },
  },
  mounted() {
    axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => {
      this.joke = res.data.joke;
      this.loading = false;
    });
  },
};
</script>

<style>
body {
  height: 98vh;
  text-align: center;
  font-size: 22px;
  line-height: 30px;
  background-size: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.joke {
  max-width: 800px;
}
</style>

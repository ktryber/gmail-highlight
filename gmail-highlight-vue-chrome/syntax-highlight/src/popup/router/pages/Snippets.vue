<template>
  <v-container>
    <h1 class="subheading grey--text">Snippets</h1>

    <v-layout row>
      <v-flex xs4 md4 lg4 style="padding-top: 16px">
        <v-card v-for="(snippet, index) in snippets" :key="index">
          <v-card-title v-on:click="snippetDetail(snippet)">{{ snippet.title }}</v-card-title>
          <!-- <EditSnippet @projectUpdated="snackbar = true" /> -->
        </v-card>
      </v-flex>
      <v-flex xs8 md8 lg8>
        <SnippetDetail :snippet="snippet" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../../fb';
// import SnippetDetail from '@/components/SnippetDetail';
import firebase from 'firebase';

export default {
  components: {
    // SnippetDetail,
  },
  data() {
    return {
      snippets: [],
      snippet: null,
    };
  },
  computed: {},
  methods: {
    snippetDetail(snippet) {
      db.collection('snippets')
        .doc(snippet.id)
        .onSnapshot(doc => {
          if (doc.exists) {
            this.snippet = {
              id: doc.id,
              title: doc.data().title,
              code: doc.data().code,
              description: doc.data().description,
              language: doc.data().language,
            };
          }
        });
    },
    fetchSnippets() {
      let userId = firebase.auth().currentUser.uid;

      let ref = db
        .collection('snippets')
        .where('person', '==', userId)
        .orderBy('created_at', 'desc');

      ref.onSnapshot(querySnapshot => {
        let tempSnippets = [];

        querySnapshot.forEach(doc => {
          tempSnippets.push({
            id: doc.id,
            title: doc.data().title,
            code: doc.data().code,
            description: doc.data().description,
          });
        });
        this.snippets = tempSnippets;
      });
    },
  },
  created() {
    this.fetchSnippets();
  },
};
</script>
<style></style>

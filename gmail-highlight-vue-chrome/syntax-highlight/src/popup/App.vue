<template>
  <v-app class="main-popup">
    <Navbar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from '../components/popup/Navbar';
export default {
  components: {
    Navbar,
  },
  data() {
    return {};
  },
};
</script>
<style>
.main-popup {
  width: 400px;
}
</style>

<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  height: 100%;
}
html{
  height: 100%;
}
body{
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
</style>

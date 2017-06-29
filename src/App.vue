<template>
  <div id="app">
    <nav class='nav has-shadow'>
      <div class='nav-left'>
        <router-link to='/' class='nav-item'>
          Home
        </router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass" src="bulma"></style>
<style>
#app {
  -webkit-font-smoothing: antialiased;
}
</style>

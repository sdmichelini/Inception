<template>
  <div class="container">
    <p class="title">{{ title }}</p>
    <errors></errors>
    <div v-if="loaded" class="box">
      <div class="content">
        <p>
          {{ $store.state.currentIdea.description }}
        </p>
        <div class="content">
          Created on <i>{{ dateCreated }}</i>
        </div>
        <div v-if="$store.state.currentIdea.linkedIdeas.length > 0">
          <p class="subtitle">Linked Ideas</p>
          <span class="tag is-primary is-medium is-outlined" v-for="idea in $store.state.currentIdea.linkedIdeas">
            <router-link class="is-primary" :to="'/ideas/' + String(idea.id)">{{ idea.title }}</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Idea',
  mounted: function () {
      this.$store.dispatch('LOAD_IDEA', this.$route.params.id)
      console.log('Mounted Component: ' + this.$route.params.id)
  },
  computed: {
    title: function () {
      if (this.loaded) {
        return this.$store.state.currentIdea.title
      } else {
        return 'Loading...'
      }
    },
    loaded: function () {
      return (this.$store.state.currentIdea !== undefined)
    },
    dateCreated: function () {
      return new Date(Date.parse(this.$store.state.currentIdea.created)).toDateString()
    }
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('LOAD_IDEA', to.params.id)
    }
  }
}
</script>

<style scoped>
a {
  color: white
}

a:hover {
  color: grey
}
</style>

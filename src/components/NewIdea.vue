<template>
<div class="container">
  <p class="title">Create New Idea</p> 
  <div v-if="$store.state.errors.length > 0">
      <p class="subtitle">Errors</p>
      <div class="tile is-ancestor">
          <div class="tile is-vertical is-parent" v-for="error in $store.state.errors">
              <div class="tile is-child notification is-danger">
                  {{ error }}
              </div>
          </div>
      </div>
  </div>
  <div class="box">
    <form v-on:submit.prevent="createIdea">
      <div class="field">
        <label class="label">Title</label>
        <p class="control">
          <input class="input" type="text" v-model="title" placeholder="What is your title for the idea?">
        </p>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <p class="control">
          <textarea class="textarea" v-model="description" placeholder="What is your description of the idea?"></textarea>
        </p>
      </div>
      <div class="field is-grouped">
      <p class="control">
        <button :disabled="!isInputValid" type='submit' class="button is-primary">Create Idea</button>
      </p>
      <p class="control">
        <router-link class="button is-link" to="/">Cancel</router-link>
      </p>
    </div>
    </form>
  </div> 
</div>
</template>

<script>

export default {
  name: 'create-idea',
  data: function () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    createIdea () {
      this.$store.dispatch('CREATE_IDEA', { title: this.title, description: this.description })
    }
  },
  computed: {
    isInputValid () {
      return (this.title.length > 0) && (this.description.length > 0)
    },
    errors () {
      return this.$store.errors
    }
  }
}
</script>

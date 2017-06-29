<template>
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
</template>

<script>

export default {
  name: 'errors'
}

</script>

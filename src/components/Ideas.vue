<template>
    <div class="container">
        <p class="title">Ideas</p>
        <div v-if="errors.length > 0">
            <p class="subtitle">Errors</p>
            <div class="tile is-ancestor">
                <div class="tile is-vertical is-parent" v-for="error in errors">
                    <div class="tile is-child notification is-danger">
                        {{ error }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tile is-ancestor">
            <div class="tile is-vertical">
                <div class="tile">
                    <div class="tile is-3 is-parent" v-for="idea in ideas">
                        <a class="tile is-child is-info box">
                            <p class="subtitle">{{ idea.title }}</p>
                            <p class="content">
                                {{ idea.description }}
                            </p>
                        </a>
                    </div>
                </div>
                <div class="tile is-2 is-parent">
                    <router-link class="tile is-child notification is-primary" to="/create-idea">
                        <p class="subtitle">New Idea</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ideas',
    mounted: function () {
        this.$store.dispatch('LOAD_IDEAS_LIST')
    },
    computed: mapState([
        'ideas',
        'errors'
    ])
}
</script>

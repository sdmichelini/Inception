<template>
    <div>
        <h1>Ideas</h1>
        <div v-if="errors.length > 0">
            <h3>Errors</h3>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
        <ul>
            <li v-for="idea in ideas">{{ idea.title }}</li>
        </ul>
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

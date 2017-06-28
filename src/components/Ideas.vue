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
                <div class="tile" v-for="row in getRows()">
                    <div class="tile is-parent is-3" v-for="idea in row">
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
    methods: {
        getRows: function () {
            let rows = [ ]
            rows.push([ ])
            let curRowIndex = 0
            let curRow = 0

            const TILES_PER_ROW = 4

            for (let idea of this.ideas) {
                // Add an idea to the current row
                rows[curRow].push(idea)
                ++curRowIndex
                if (curRowIndex === TILES_PER_ROW) {
                    curRowIndex = 0
                    rows.push([])
                    ++curRow
                }
            }
            console.log(rows)
            return rows
        }
    },
    mounted: function () {
        this.$store.dispatch('LOAD_IDEAS_LIST')
    },
    computed: mapState([
        'ideas',
        'errors'
    ])
}
</script>

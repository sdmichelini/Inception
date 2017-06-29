import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ideas: [],
    currentIdea: undefined,
    errors: [],
    loading: false
  },
  actions: {
    LOAD_IDEAS_LIST: function ({ commit }) {
        axios.get('http://localhost:3000/api/v1/ideas').then(response => {
            commit('SET_IDEAS_LIST', { list: response.data.ideas })
            commit('CLEAR_ERRORS_LIST')
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.errors) {
                    commit('SET_ERRORS_LIST', { list: err.response.data.errors })
                } else {
                    commit('SET_ERRORS_LIST', { list: [ err.message ] })
                }
            } else {
                console.error(err)
                commit('SET_ERRORS_LIST', { list: [ err.message ] })
            }
        })
    },
    CREATE_IDEA ({ commit }, idea) {
        axios.post('http://localhost:3000/api/v1/ideas', {
            title: idea.title,
            description: idea.description
        }).then(response => {
            commit('ADD_IDEA', { idea: { title: idea.title, description: idea.description } })
            commit('CLEAR_ERRORS_LIST')
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.errors) {
                    commit('SET_ERRORS_LIST', { list: err.response.data.errors })
                } else {
                    commit('SET_ERRORS_LIST', { list: [ err.message ] })
                }
            } else {
                console.error(err)
                commit('SET_ERRORS_LIST', { list: [ err.message ] })
            }
        })
    },
    LOAD_IDEA ({ commit }, id) {
        commit('CLEAR_CURRENT_IDEA')
        axios.get('http://localhost:3000/api/v1/ideas/' + String(id)).then(response => {
            commit('SET_CURRENT_IDEA', { idea: response.data })
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.errors) {
                    commit('SET_ERRORS_LIST', { list: err.response.data.errors })
                } else {
                    commit('SET_ERRORS_LIST', { list: [ err.message ] })
                }
            } else {
                console.error(err)
                commit('SET_ERRORS_LIST', { list: [ err.message ] })
            }
        })
    }
  },
  mutations: {
    SET_IDEAS_LIST: (state, { list }) => {
        state.ideas = list
    },
    SET_ERRORS_LIST: (state, { list }) => {
        state.errors = list
    },
    CLEAR_ERRORS_LIST: (state) => {
        state.errors = []
    },
    ADD_IDEA: (state, { idea }) => {
        state.ideas = state.ideas.concat(idea)
    },
    CLEAR_CURRENT_IDEA: (state) => {
        state.currentIdea = undefined
    },
    SET_CURRENT_IDEA: (state, { idea }) => {
        state.currentIdea = idea.idea
    }
  },
  getters: {
    hasError: state => {
        return state.errors.length > 0
    }
  }
})
export default store

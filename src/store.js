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
            if (err.response.data.errors) {
                commit('SET_ERRORS_LIST', { list: err.response.data.errors })
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
    }
  },
  getters: {
    hasError: state => {
        return state.errors.length > 0
    }
  }
})
export default store

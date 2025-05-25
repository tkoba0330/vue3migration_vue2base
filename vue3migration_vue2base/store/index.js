export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const actions = {
  incrementCounter({ commit }) {
    commit('increment')
  }
}

export const getters = {
  getCounter(state) {
    return state.counter
  }
}

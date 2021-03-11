export const state = () => ({
  list: [],
  breeds: [],
})

export const mutations = {
  setDogs(state, data) {
    state.list = data;
  },
  setBreeds(state, data) {
    state.breeds = data;
  }
}

export const actions = {
  getBreeds({commit}) {
    this.$axios.get('breeds/list/all')
      .then(data => Object.keys(data)
        .reduce((acc, c) => data[c].length ? [...acc, c, ...data[c].map(i => c + '-' + i)] : [...acc, c], []))
      .then(data => commit('setBreeds', data));
  },
  getDogs({commit, store}, breed) {
    this.$axios.get(`breed/${breed.replace('-', '/')}/images`, {progress: false})
      .then(data => commit('setDogs', data));
  }
}



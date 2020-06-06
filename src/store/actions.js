import firebase from 'firebase'

export default {
  fetchItem ({ state, commit }, { id, emoji, resource }) {
    console.log('🔥‍', emoji, id)
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        commit('setItem', { resource, id: snapshot.key, item: snapshot.val() })
        // resolve(state[resource].items[id])
        // resolve(state[resource][id])
        // Loading
        setTimeout(() => resolve(resolve(state[resource].items[id])), 1000)
      })
    })
  },

  fetchItems ({ dispatch }, { ids, resource, emoji }) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource, emoji })))
  }
}

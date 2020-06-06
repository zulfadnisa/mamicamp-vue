import { makeAppendChildToParentMutation } from '@/store/assetHelpers'

export default {
  namespaced: true,
  state: {
    items: {}
  },
  actions: {
    fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id, emoji: '🌧' }, { root: true }),
    fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'forums', ids, emoji: '🌧' }, { root: true })
  },
  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' })
    // appendThreadToForum (state, { forumId, threadId }) {
    //   const forum = state.forums[forumId]
    //   if (!forum.threads) {
    //     Vue.set(forum, 'threads', {})
    //   }
    //   Vue.set(forum.threads, threadId, threadId)
    // },
  }
}

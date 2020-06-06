<template>
  <div v-if="asyncDataStatus_ready" class="col-full">
    <h1>{{ category.name }}</h1>
    <CategoryListItem :category="category" />
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    CategoryListItem,
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    category () {
      return this.$store.state.categories.items[this.id]
    }
  },
  methods: {
    ...mapActions('categories', ['fetchCategory']),
    ...mapActions('forums', ['fetchForums'])
  },
  created () {
    // this.$store.dispatch('fetchCategory', { id: this.id })
    this.fetchCategory({ id: this.id })
      // .then(category => {
      //   // this.$store.dispatch('fetchForums', { ids: category.forums })
      //   this.fetchForums({ ids: category.forums })
      // })
      // MIXINS
      .then(category => this.fetchForums({ ids: category.forums })) // ?
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

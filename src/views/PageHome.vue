<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>

import CategoryList from '@/components/CategoryList'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  name: 'HelloWorld',
  components: {
    CategoryList
  },
  mixins: [asyncDataStatus],
  data () {
    return {
      // categories: Object.values(this.$store.state.categories)
      ready: false
    }
  },
  computed: {
    categories () {
      return Object.values(this.$store.state.categories.items)
    }
  },
  methods: {
    ...mapActions('categories', ['fetchAllCategories']),
    ...mapActions('forums', ['fetchForums'])
  },
  // beforeCreate () {
  //   this.$store.dispatch('fetchAllCategories')
  //     .then(categories => {
  //       categories.forEach(category => this.$store.dispatch('fetchForums', { ids: Object.keys(category.forums) }))
  //     })
  // }
  created () {
    this.fetchAllCategories()
      .then(categories => Promise.all(categories.map(category => this.fetchForums({ ids: Object.keys(category.forums) }))))
      .then(() => {
        this.asyncDataStatus_fetched()
      })
    //   .then(categories => {
    //     categories.forEach(category => this.fetchForums({ ids: Object.keys(category.forums) }))
    //   })
    // Hide component
  }

  // beforeCreate () { // ga bisa manggil category
  //   console.log('beforeCreate', this.categories)
  // },
  // created () {
  //   console.log('created', this.categories)
  // },
  // beforeMount () { // ga bisa manggil innerText
  //   console.log('beforeMount', this.categories)
  // },
  // mounted () {
  //   console.log('mounted', this.categories, this.$el.innerText)
  // },
  // beforeDestroy () {
  //   console.log('beforeDestroy - turn off listener', this.categories)
  // },
  // destroyed () {
  //   console.log('destroyed', this.categories)
  // }
}
</script>

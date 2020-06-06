<template>
  <div class="flex-grid">
    <UserProfileCard
      v-if="!edit"
      :user="user"
    />
    <UserProfileCardEditor
      v-else
      :user="user"
    />

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
            {{user.username}}'s recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>
      <PostList :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import { mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
// import { countObjectProperties } from '@/utils'

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters({
      user: 'auth/authUser'
    }),
    // userThreadsCount () {
    //   //   return this.user.threads ? Object.keys(this.user.threads).length : 0
    //   return countObjectProperties(this.user.threads)
    // },
    // userPostsCount () {
    //   //   return this.user.posts ? Object.keys(this.user.posts).length : 0
    //   return countObjectProperties(this.user.posts)
    // },
    userPosts () {
      return this.$store.getters['users/userPosts'](this.user['.key'])
    }
  },
  created () {
    this.$store.dispatch('posts/fetchPosts', { ids: this.user.posts })
      .then(() => this.asyncDataStatus_fetched())
  }
}
</script>

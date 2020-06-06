<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea cols="30" rows="10" class="form-input" v-model="text"></textarea>
    </div>
    <div class="form-actions">
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        const valid = keyIsValid && textIsValid
        // if (!textIsValid) {
        //   console.error('😳 The post prop object must include a `text` attribute.')
        // }
        // if (!keyIsValid) {
        //   console.error('😳 The post prop object must include a `.key` attribute.')
        // }
        // ERROR DI LAPTOPKU
        return valid
      }
    }
  },
  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },
  computed: {
    isUpdate () {
      return !!this.post
    }
  },
  methods: {
    ...mapActions('posts', ['createPost', 'updatePost']),
    save () {
      this.persist()
        .then(post => {
          this.$emit('save', { post })
        })
    },
    persist () {
      return this.isUpdate ? this.update() : this.create()
    },
    create () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }
      //   // sourceData.posts[postId] = post
      //   // this.thread.posts[postId] = postId
      //   // sourceData.users[post.userId].posts[postId] = postId
      //   // Vue.set(Obj, property name, value) sama kayak yg dua diatas
      //   this.$set(this.$store.state.posts, postId, post);
      //   this.$set(this.thread.posts, postId, postId);
      //   this.$set(this.$store.state.users[post.userId].posts, postId, postId);

      this.text = ''
      // this.$emit('save', { post })
      return this.createPost(post)
    },
    update () {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }
      return this.updatePost(payload)
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

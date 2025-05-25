<template>
  <div>
    <HelloWorld />
    <p>This is the index page.</p>
    <nuxt-link to="/about">Go to About Page</nuxt-link>

    <hr>
    <h3>Vuex Store Demo</h3>
    <p>Counter: {{ $store.state.counter }}</p>
    <p>Counter (via getter): {{ getCounterValue }}</p>
    <button @click="increment">Increment Counter</button>

    <hr>
    <h3>Static Asset Demo</h3>
    <p>
      <a href="/sample.txt" target="_blank">View static sample.txt</a>
    </p>
  </div>
</template>

<script>
import HelloWorld from '~/components/HelloWorld.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters({
      getCounterValue: 'getCounter' // maps store.getters.getCounter to this.getCounterValue
    })
  },
  methods: {
    ...mapActions({
      incrementAction: 'incrementCounter' // maps store.actions.incrementCounter to this.incrementAction
    }),
    increment() {
      this.incrementAction();
    }
  }
}
</script>

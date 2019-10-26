<template>
  <div class="home">
    <MainGraph />
  </div>
</template>

<script>
// @ is an alias to /src
import MainGraph from '@/components/MainGraph.vue'

export default {
  name: 'home',
  components: {
    MainGraph
  }
}
</script>

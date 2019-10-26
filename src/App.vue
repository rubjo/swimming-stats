<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Hjem</router-link> |
      <router-link to="/about">Om</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background: #eee;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.margin-left {
  margin-left: 10px;
}
.small {
  font-size: 0.8em;
}
</style>

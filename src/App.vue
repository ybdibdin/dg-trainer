<template>
  <div>
  <div class="nav">
    <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
      <router-link to="/"><el-menu-item index="1">Processing Center</el-menu-item></router-link>
      <router-link to="/create"><el-menu-item index="3">create new task</el-menu-item></router-link>
      <el-menu-item index="2" style="float: right"><a href="http://www.deepglint.com" target="_blank">Contact us</a></el-menu-item>
    </el-menu>
  </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      activeIndex: '1',
    }
  },
  method:{

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

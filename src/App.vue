<template>
  <div style="height: 100%;width: 100%; background-color: #1F2D3D;">
    <Top-nav class="nav"></Top-nav>
    <div style="height: 90vh;width:100%;overflow: scroll">
      <Left-panel class="leftpanel"></Left-panel>
      <router-view class="panel"></router-view>
    </div>
  </div>
</template>

<script>
  import TopNav from './components/nav.vue';
  import LeftPanel from './components/leftpanel.vue';
  import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      activeIndex: '1',
    }
  },

  method:{

  },
  components:{
      TopNav,
    LeftPanel
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .nav{
    height: 10vh;
  }
  .leftpanel{
    width: 20vw;
    float: left;
    height: 100%;

  }
  .panel{
    margin-left: 21vw;
    width: 78vw;
    height: 100%;
    overflow: hidden;
    background-color: #324057;
  }
</style>

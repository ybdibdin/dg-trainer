<template>
  <div style="height: 100%;width: 100%">
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
    width: 16vw;
    float: left;
    height: 100%;

  }
  .panel{
    margin-left: 17vw;
    width: 82vw;
    height: 100%;
    overflow: auto;
  }
</style>

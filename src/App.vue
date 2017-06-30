<template>
  <div style="height: 100%;width: 100%;margin: 0 auto">
    <Top-nav class="nav"></Top-nav>
    <div style="height: 88vh;width:100%;overflow: hidden;">
      <Left-panel class="leftpanel"></Left-panel>
      <router-view class="panel"></router-view>
    </div>
  </div>
</template>

<script>
  import TopNav from './components/nav.vue';
  import LeftPanel from './components/leftpanel.vue';
  import { mapState } from 'vuex'
  import CodeMirror from 'codemirror/lib/codemirror'   // CodeMirror，必要
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

<template>
  <div>
    <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
      <router-link to="/chart"><h2 style="font-family: 'Helvetica Neue';color: #324057;float: left;margin-left: 50px">DG-Trainer</h2></router-link>
      <el-menu-item index="1" style="float: right"><a href="http://www.deepglint.com" target="_blank">Contact us</a></el-menu-item>
      <el-menu-item index="2" style="float:right;">Login</el-menu-item>
    </el-menu>
  </div>
</template>


<script>
  import ElMenuItem from "../../node_modules/element-ui/packages/menu/src/menu-item";
  import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";
  export default {
    components: {
      ElMenu,
      ElMenuItem},
    data () {
      return {
        activeIndex: '1',
      }
    },
    methods:{

    }
  }


</script>

<style scoped>

</style>

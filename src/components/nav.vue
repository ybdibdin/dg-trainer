<template>
  <div>
    <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
      <h2 style="font-family: 'Helvetica Neue';color: #324057;float: left;margin-left: 50px">DG-Trainer</h2>
      <el-menu-item index="1" style="float: right"><a href="http://www.deepglint.com" target="_blank">Contact us</a></el-menu-item>
      <el-menu-item index="2" style="float:right;">Login</el-menu-item>
    </el-menu>
  </div>
</template>


<script>
  import ElMenuItem from "../../node_modules/element-ui/packages/menu/src/menu-item";
  export default {
    components: {ElMenuItem},
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

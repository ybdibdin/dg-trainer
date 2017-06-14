<template>
  <div>

      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" style="height: 100%">
        <el-menu-item index="4">Create New Task</el-menu-item>
        <el-menu-item index="4">Index</el-menu-item>
        <el-submenu index="1">
          <template slot="title">Resources</template>
          <el-menu-item-group title="Resource List">
            <el-menu-item index="1-1">Resource 1</el-menu-item>
            <el-menu-item index="1-2">Resource 2</el-menu-item>
            <el-menu-item index="1-3">Resource 3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">Task List</el-menu-item>
        <el-menu-item index="3">Image</el-menu-item>
      </el-menu>

  </div>
</template>


<script>
  export default {
    data () {
      return {

      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }


</script>

<style scoped>

</style>

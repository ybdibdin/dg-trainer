<template>
  <div>

      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="light" style="height: 100%">
        <router-link to="/createtask"><el-menu-item index="5">Create New Task</el-menu-item></router-link>
        <router-link to="/"><el-menu-item index="4">Index</el-menu-item></router-link>
        <el-submenu index="1">
          <template slot="title">Resources</template>
          <el-menu-item-group title="Resource List">
            <router-link to="/resourcelist"><el-menu-item index="1-1">Resource 1</el-menu-item></router-link>
            <el-menu-item index="1-2">Resource 2</el-menu-item>
            <el-menu-item index="1-3">Resource 3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <router-link to="/tasklist"><el-menu-item index="2">Task List</el-menu-item></router-link>
        <router-link to="/image"><el-menu-item index="3">Image</el-menu-item></router-link>
        <router-link to="/detail"><el-menu-item index="6">Detail</el-menu-item></router-link>
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

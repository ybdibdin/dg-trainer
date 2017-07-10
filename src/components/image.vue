<template>
  <div>
    <div class="stateshow" style="height: 50vh">

    </div>
  <div class="create">
    <el-form ref="form"  :model="form" label-width="180px" style="display: flex;justify-content: flex-start;flex-wrap: wrap">
      <el-form-item
        label="image" >
        <el-input  v-model="form.image"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="tagname" >
        <el-input  v-model="form.tagname"  auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item
        label="base" >
        <el-input  v-model="form.base"  auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item
        label="githubrepo" >
        <el-input  v-model="form.githubrepo"  auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item
        label="branch" >
        <el-input  v-model="form.branch"  auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item
        label="commit" >
        <el-input  v-model="form.commit"  auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="ModelFile">
        <input type="file" />
      </el-form-item>
    </el-form>
    <button type="primary" style="float: right">submit</button>
  </div>
  </div>
</template>


<script>
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {
      ElForm,
      ElInput,
      ElFormItem},
    data () {
      return {
      form:{
        image:'',
        tagname:'',
        base:'',
        githubrepo:'',
        branch:'',
        commit:''
      }
      }
    },
    methods:{

    }
  }


</script>

<style scoped>
  .create{
    width: 80%;
    margin:0 auto;
    height: 90%;
  }


</style>



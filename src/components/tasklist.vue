<template>
  <div>
    <template>
      <el-table :data="tableData" border style="width: 100%" stripe highlight-current-row>
        <el-table-column label="日期" width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="taskid" width="300">
          <template scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>docker_image: {{ scope.row.docker_image }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="150" :filters="[{ text: 'TASK_KILLED', value: 'TASK_KILLED' }, { text: 'TASK_FINISHED', value: 'TASK_FINISHED' },{text:'TASK_RUNNING',value:'TASK_RUNNING'},{text:'TASK_FAILED',value:'TASK_FAILED'}]"
                         :filter-method="filterTag" filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.tagclass" close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <router-link v-bind:to="'/detail/'+scope.$index"><el-button size="small" @click="handleEnter(scope.$index, scope.row)">Details</el-button></router-link>
            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">stop</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>


<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {

      }
    },
    methods:{
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return 'chen';
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleDelete:function (index, row) {
          console.log('tab',this.tableData)
        this.$http({
          url:'http://192.168.6.66:8081/dgtrainer/v1/task/'+this.tableData[index].name,
          method:'get',
          headers: {
            'Content-Type': 'application/json'
          }
//                'Content-Type': 'application/json ;charset=utf-8',
//                'Access-Control-Request-Method':'DELETE'
//            }
        }).then((res)=>{
          this.$store.commit('deleteitem',index);
          this.$notify({
            title: '成功',
            message: '删除任务成功',
            type: 'info'
          });
        })

      },
      handleEdit(index, row) {
        //console.log(index, row);
      },
      handleEnter(index, row){
        //router.push({ name: 'detail', params: { index: index }})
         // console.log(index)
      }
    },
    computed:{
      ...mapState({
        tableData:state=>state.data.tasklist
      })
    }
  }


</script>

<style scoped>

</style>

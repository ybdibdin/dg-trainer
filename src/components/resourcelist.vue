<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">

      <el-table-column
        fixed
        prop="hostname"
        label="hostname"
        width="180">
      </el-table-column>

      <el-table-column
        label="resource">
        <el-table-column
          prop="resource.cpus"
          label="cpus"
          >
        </el-table-column>
          <el-table-column
            prop="resource.gpus"
            label="gpus"
            >
          </el-table-column>
            <el-table-column
              prop="resource.mem"
              label="mem"
              >
            </el-table-column>
              <el-table-column
                prop="resource.disk"
                label="disk"
                >
              </el-table-column>
      </el-table-column>

      <el-table-column
        label="offered_resources">
        <el-table-column
          prop="offeredR.cpus"
          label="cpus"
        >
        </el-table-column>
        <el-table-column
          prop="offeredR.gpus"
          label="gpus"
        >
        </el-table-column>
        <el-table-column
          prop="offeredR.mem"
          label="mem"
        >
        </el-table-column>
        <el-table-column
          prop="offeredR.disk"
          label="disk"
        >
        </el-table-column>
      </el-table-column>

      <el-table-column
        label="unreserved_resource">
        <el-table-column
          prop="unreservedR.cpus"
          label="cpus"
        >
        </el-table-column>
        <el-table-column
          prop="unreservedR.gpus"
          label="gpus"
        >
        </el-table-column>
        <el-table-column
          prop="unreservedR.mem"
          label="mem"
        >
        </el-table-column>
        <el-table-column
          prop="unreservedR.disk"
          label="disk"
        >
        </el-table-column>
      </el-table-column>

      <el-table-column
        label="used_resource">
        <el-table-column
          prop="usedR.cpus"
          label="cpus"
        >
        </el-table-column>
        <el-table-column
          prop="usedR.gpus"
          label="gpus"
        >
        </el-table-column>
        <el-table-column
          prop="usedR.mem"
          label="mem"
        >
        </el-table-column>
        <el-table-column
          prop="usedR.disk"
          label="disk"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  import { mapState, mapMutations} from 'vuex'
  export default {
    data () {
      return {

      }
    },
    methods:{

    },
    computed:{
      ...mapState({
        tableData:state=>state.data.resourcelist
      })
    }

  }


</script>

<style scoped>

</style>

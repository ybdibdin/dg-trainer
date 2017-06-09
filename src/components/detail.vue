<div id="logpanel">

  <el-radio-group   class="checkboxshow">
    <el-checkbox v-model="Gpus1">Gpus--1</el-checkbox>
    <el-checkbox v-model="Cpus1">Cpus--1</el-checkbox>
    <el-checkbox v-model="Mem16">Mem--16</el-checkbox>
    <el-checkbox v-model="Disk256">Disk--256</el-checkbox>
    <el-checkbox v-model="Instance1">Instance--1</el-checkbox>
  </el-radio-group>

  <el-tabs v-model="activeName">
    <el-tab-pane label="task" name="first"><el-input
      type="textarea"
      :rows="25"
      v-model="text1">
    </el-input></el-tab-pane>
    <el-tab-pane label="tasks list" name="second"><el-input
      type="textarea"
      :rows="25"
      v-model="text2">
    </el-input></el-tab-pane>
    <el-tab-pane label="task log" name="third"><el-input
      type="textarea"
      :rows="25"
      v-model="text3">
    </el-input></el-tab-pane>
    <el-tab-pane label="task info" name="forth"><el-input
      type="textarea"
      :rows="25"
      v-model="text4">
    </el-input></el-tab-pane>
    <el-tab-pane label="docker images" name="fifth"><el-input
      type="textarea"
      :rows="25"
      v-model="text5">
    </el-input></el-tab-pane>
    <el-tab-pane label="get resources" name="sixth"><el-input
      type="textarea"
      :rows="25"
      v-model="text6">
    </el-input></el-tab-pane>

  </el-tabs>
</div>

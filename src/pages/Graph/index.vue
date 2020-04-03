<template>
  <div class="graph-content">
    <div class="pos-button">
      <el-radio-group v-model="modeRadio" @change="onRadioChange" size="medium">
        <el-radio-button label="1">模式一</el-radio-button>
        <el-radio-button label="2">模式二</el-radio-button>
      </el-radio-group>
    </div>
    <div class="echarts1" ref="echarts1"></div>
  </div>
</template>

<script>
import {getGraphOptions} from './vData'
import echarts from 'echarts'

export default {
  data () {
    return {
      echarts1: null,
      modeRadio: '1'
    }
  },
  methods: {
    onRadioChange () {
      console.log('----modeRadio', this.modeRadio)
      this.initEcharts()
    },
    onEchartsClick (params) {
      console.log('-------params', params)
      // const data = params.data
    },
    initEcharts () {
      const options = getGraphOptions(this.modeRadio)
      console.log('options', options)
      this.echarts1.setOption(options)
    },
    resize () {
      this.echarts1.resize()
    }
  },
  mounted () {
    this.echarts1 = echarts.init(this.$refs.echarts1)
    this.echarts1.on('click', this.onEchartsClick)
    this.initEcharts()
    window.addEventListener('resize', this.resize)
  },
  created () {
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style lang="scss" scoped>
.graph-content{
  width: 100%;
  height: 100%;
  position: relative;

  .pos-button{
    position: absolute;
    z-index: 2;
  }
  .echarts1 {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12" :offset="0">
        <el-select
          v-model="selectedSwimmers"
          multiple
          placeholder="Alle svømmere"
        >
          <el-option
            v-for="swimmer in swimmers"
            :key="swimmer.id"
            :label="swimmer.name"
            :value="swimmer.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-switch
          v-model="xMode"
          active-color="#0bf"
          inactive-color="#0bf"
          active-text="Etter dato"
          inactive-text="Etter alder"
        >
        </el-switch>
      </el-col>
      <el-col :span="6">
        <el-switch
          v-model="yMode"
          active-color="#0bf"
          inactive-color="#0bf"
          active-text="Vis tid"
          inactive-text="Vis poeng (FINA 2019)"
        >
        </el-switch>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10">
      <el-col :span="24" :offset="0">
        <el-select
          v-model="selectedDisciplines"
          multiple
          placeholder="Alle disipliner"
        >
          <el-option
            v-for="discipline in disciplines"
            :key="discipline"
            :label="discipline"
            :value="discipline"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <br>
    <div
      ref="chart"
      id="chart"
    ></div>
    <div id="tooltip"></div>
  </div>
</template>
<script>
import 'vega'
import vegaEmbed from 'vega-embed'
import timeByDateSpec from '@/specs/timeByDate.js'
import timeByAgeSpec from '@/specs/timeByAge.js'
import pointsByDateSpec from '@/specs/pointsByDate.js'
import pointsByAgeSpec from '@/specs/pointsByAge.js'
import { swimmers, results } from '@/data/mainStats.js'

function tooltipHandler (handler, event, item, value) {
  const tooltip = document.querySelector('#tooltip')

  if (value) {
    tooltip.innerHTML =
      `
      <div class="small">
        ${value.competitionName}, ${value.venueName}
      </div>
      <div class="small">
        ${value.competitionDate.format('LL')}
      </div>
      <div>
        <strong class="pull-left">${value.swimmerName}</strong>
        <span class="small pull-right margin-left">${value.humanizedSwimmerAge}</span>
      </div><br>
      <div>
        <span class="pull-left">${value.discipline}</span>
        <strong class="pull-right text-right margin-left">${value.humanizedTime}</strong>
      </div><br>
      <div>
        <span class="small pull-left">WR: ${value.humanizedRecordTime}</span>
        <strong class="pull-right margin-left">${value.points}p</strong>
      </div>
    `

    tooltip.style.left = item.x + 'px'
    tooltip.style.top = item.y + 'px'
    tooltip.classList.add('visible')
  } else {
    tooltip.classList.remove('visible')
  }
}

export default {
  name: 'Graph',
  data () {
    return {
      selectedSwimmers: [],
      swimmers,
      selectedDisciplines: [],
      disciplines: results.reduce((acc, result) => {
        if (!acc.includes(result.discipline)) acc.push(result.discipline)
        return acc
      }, []),
      xMode: true,
      yMode: true
    }
  },
  watch: {
    selectedSwimmers (newVal, oldVal) {
      this.destroyChart()
      this.renderChart()
    },
    selectedDisciplines (newVal, oldVal) {
      this.destroyChart()
      this.renderChart()
    },
    xMode (newVal, oldVal) {
      this.destroyChart()
      this.renderChart()
    },
    yMode (newVal, oldVal) {
      this.destroyChart()
      this.renderChart()
    }
  },
  computed: {
    filteredSpec () {
      let spec
      if (this.xMode) {
        if (this.yMode) spec = Object.assign({}, timeByDateSpec)
        else spec = Object.assign({}, pointsByDateSpec)
      } else {
        if (this.yMode) spec = Object.assign({}, timeByAgeSpec)
        else spec = Object.assign({}, pointsByAgeSpec)
      }

      const filtered = []

      if (this.selectedSwimmers.length || this.selectedDisciplines.length) {
        spec.data.forEach(data => {
          data.values.forEach(entry => {
            const swimmerIsSelected = this.selectedSwimmers.includes(entry.swimmerId)
            const disciplineIsSelected = this.selectedDisciplines.includes(entry.discipline)

            if (swimmerIsSelected || disciplineIsSelected) {
              filtered.push(entry)
            }
          })
        })
      }

      spec.data = { name: 'stats', values: filtered }

      return spec
    }
  },
  mounted () {
    window.graph = this

    this.disciplines.sort((a, b) => {
      const distanceA = parseInt(a.substr(0, a.indexOf('m')))
      const distanceB = parseInt(b.substr(0, b.indexOf('m')))
      return distanceA < distanceB
        ? -1
        : distanceA > distanceB
          ? 1
          : 0
    })

    this.renderChart()
  },
  methods: {
    renderChart () {
      vegaEmbed('#chart', this.filteredSpec, {
        tooltip: tooltipHandler
      }).then(result => {
        this.chart = result.view
        window.chart = this.chart
      }).catch(console.error)
    },
    destroyChart () {
      this.chart.finalize()
      this.$refs.chart.innerHTML = ''
    },
    selSwimmers () {
      return [1]
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>

.el-select {
  width: 100%;
}

#tooltip {
  position: absolute;
  padding: 2px 6px;
  background: #444;
  color: #fff;
  margin-top: 50px;
  border-radius: 4px;
  opacity: 0.9;
  transition: opacity 0.25s;
  z-index: 9999;
  &:not(.visible) {
    opacity: 0;
    z-index: -1;
    transition-delay: 0;
  }
}

#chart {
  background: #fff;
  padding: 15px;
}
</style>

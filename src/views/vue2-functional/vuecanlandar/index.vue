<template>
  <div>
    <h2>这是一个日历组件</h2>
    <div>
      <div class="calendar-box">
        <div class="calendar-tool-box">
          <span
            class="prev el-icon-caret-left"
            @click="handleMinusMonth"
          ></span>
          <span class="year">{{ year }}年</span>
          <span class="month">{{ month }}月</span>
          <span class="next el-icon-caret-right" @click="handleAddMonth"></span>
        </div>
        <div class="calendar-title">
          <span
            class="calendar-title-day"
            v-for="item in daysTitle"
            :key="item"
          >
            {{ item }}</span
          >
        </div>
        <div class="calendar-body">
          <div
            class="calendar-week"
            v-for="(item, index) in daysLists"
            :key="index"
          >
            <span
              :class="['calendar-day', im.isCurrentMonth && 'current']"
              v-for="(im, idx) in item"
              :key="idx"
            >
              {{ im.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'Calendar',
  data() {
    return {
      daysLists: [],
      date: dayjs().format('YYYY-MM'),
      month: dayjs().month() + 1, // 获取当前月份
      year: dayjs().year() // 获取当前年份
    }
  },
  created() {
    console.log(dayjs().startOf('month').format('YYYY-MM-DD'))
    console.log(dayjs().endOf('month').format('YYYY-MM-DD'))
    console.log(dayjs().startOf('month').add(1, 'week').format('YYYY-MM-DD'))
    console.log(dayjs().startOf('month').day())

    console.log(this.daysLists)
    console.log(this.month)
    console.log(this.year)
    this.getDateLists()
  },
  props: {
    type: {
      type: String,
      default: '1' // 周日开始 0 周一开始 1
    }
  },
  computed: {
    // 头部数据
    daysTitle() {
      return this.type == '1'
        ? ['一', '二', '三', '四', '五', '六', '日']
        : ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  methods: {
    getDateLists() {
      const daysLists = []
      this.daysLists = []
      // 前面补上上个月的日期
      const diff =
        dayjs(this.year + '-' + this.month).day() === 0
          ? 7
          : dayjs(this.year + '-' + this.month).day()
      for (let i = 1; i < diff; i++) {
        daysLists.unshift({
          date: dayjs(`${this.year}-${this.month}`)
            .startOf('month')
            .add(-i, 'day')
            .format('YYYY-MM-DD'),
          label: dayjs(`${this.year}-${this.month}`)
            .startOf('month')
            .add(-i, 'day')
            .format('D')
        })
      }
      // 获取当月
      for (
        let i = 1;
        i <= dayjs(this.year + '-' + this.month).daysInMonth();
        i++
      ) {
        daysLists.push({
          date: dayjs(this.year + '-' + this.month + '-' + i).format(
            'YYYY-MM-DD'
          ),
          label: dayjs(this.year + '-' + this.month + '-' + i).format('D'),
          // 是当前的月的日期
          isCurrentMonth: true
        })
      }

      // 后面补上下个月的日期
      const len = 42 - daysLists.length
      for (let i = 1; i <= len; i++) {
        daysLists.push({
          date: dayjs(`${this.year}-${this.month}`)
            .endOf('month')
            .add(i, 'day')
            .format('YYYY-MM-DD'),
          label: dayjs(`${this.year}-${this.month}`)
            .endOf('month')
            .add(i, 'day')
            .format('D')
        })
      }
      // dataList 分割成7组，每组7个
      for (let index = 0; index < daysLists.length; index++) {
        if (index % 7 === 0) {
          this.daysLists.push(daysLists.slice(index, index + 7))
        }
      }
      console.log('🚀 ~ getDateLists ~ arrDate:', this.daysLists)
    },
    handleAddMonth() {
      if (this.month == 12) {
        this.year++
        this.month = 1
      } else if (this.month < 1) {
        this.year--
        this.month = 12
      } else {
        this.month++
      }
      this.getDateLists()
    },
    handleMinusMonth() {
      if (this.month == 1) {
        this.year--
        this.month = 12
      } else if (this.month > 12) {
        this.year++
        this.month = 1
      } else {
        this.month--
      }
      this.getDateLists()
    }
  }
}
</script>
<style lang="scss" scoped>
.calendar-box {
  max-width: 900px;
  border: 1px solid #d7d7d7;
  .calendar-tool-box {
    display: flex;
    align-items: center;
    padding: 20px 0;
    .prev,
    .next {
      cursor: pointer;
      font-size: 26px;
    }
  }
  margin: 0 auto;
  .calendar-title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    background-color: #d7d7d7;
    .calendar-title-day {
      width: 50px;
      line-height: 50px;
      text-align: center;
    }
  }
  .calendar-body {
    .calendar-week {
      display: flex;
      justify-content: space-between;
      height: 50px;
      .calendar-day {
        color: #d7d7d7;
        width: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        &.current {
          color: #333;
        }
      }
    }
  }
}
</style>

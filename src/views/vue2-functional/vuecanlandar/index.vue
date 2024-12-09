<template>
  <div>
    <h2>这是一个日历组件</h2>
    <div>
      <div class="calendar-box">
        <div class="calendar-tool-box">
          <span class="prev el-icon-caret-left" @click="handleMinusMonth"></span>
          <span class="year">{{ year }}年</span>
          <span class="month">{{ month }}月</span>
          <span class="next el-icon-caret-right" @click="handleAddMonth"></span>
        </div>
        <div class="back-today" @click="handleBackToday">回到今天</div>
        <div class="calendar-title">
          <span class="calendar-title-day" v-for="item in daysTitle" :key="item">{{ item }}</span>
        </div>
        <div class="calendar-body">
          <div class="calendar-week" v-for="(item, index) in daysLists" :key="index">
            <span
              :class="[
                'calendar-day',
                im.isCurrentMonth && 'current',
                im.isToday && im.isCurrentMonth && 'today',
                im.isCurrent && 'isCurrent'
              ]"
              v-for="(im, idx) in item"
              :key="idx"
              @click="handleClick(im)"
            >
              {{ im.label }}
              <strong>{{ im.cnDay }}</strong>
              <strong
                v-if="!im.isWorkday && im.isCurrentMonth"
                class="calendar-day-rest"
              >{{ im.isWorkday ? '' : '休' }}</strong>
              <strong v-if="im.isToday && im.isCurrentMonth" class="calendar-day-today">今</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { isWorkday } from "./util";
import isToday from "dayjs/plugin/isToday";
import { Lunar } from "lunar-javascript";
dayjs.extend(isToday);
export default {
  name: "Calendar",
  data() {
    return {
      daysLists: [],
      date: dayjs().format("YYYY-MM"),
      month: dayjs().month() + 1, // 获取当前月份
      year: dayjs().year(), // 获取当前年份
    };
  },
  created() {
    this.getDateLists();
  },
  props: {
    type: {
      type: String,
      default: "1", // 周日开始 0 周一开始 1
    },
  },
  computed: {
    // 头部数据
    daysTitle() {
      return this.type == "1"
        ? ["一", "二", "三", "四", "五", "六", "日"]
        : ["日", "一", "二", "三", "四", "五", "六"];
    },
  },
  methods: {
    getDateLists() {
      const daysLists = [];
      this.daysLists = [];
      // 前面补上上个月的日期
      const diff =
        dayjs(this.year + "-" + this.month).day() === 0
          ? 7
          : dayjs(this.year + "-" + this.month).day();
      for (let i = 1; i < diff; i++) {
        daysLists.unshift({
          date: dayjs(`${this.year}-${this.month}`)
            .startOf("month")
            .add(-i, "day")
            .format("YYYY-MM-DD"),
          label: dayjs(`${this.year}-${this.month}`)
            .startOf("month")
            .add(-i, "day")
            .format("D"),
          isWorkday: isWorkday(
            dayjs(`${this.year}-${this.month}`)
              .startOf("month")
              .add(-i, "day")
              .format("YYYY-MM-DD")
          ),
          cnDay: Lunar.fromDate(
            new Date(
              dayjs(`${this.year}-${this.month}`)
                .startOf("month")
                .add(-i, "day")
                .format("YYYY-MM-DD")
            )
          ).getDayInChinese(),
        });
      }
      // 获取当月
      for (
        let i = 1;
        i <= dayjs(this.year + "-" + this.month).daysInMonth();
        i++
      ) {
        daysLists.push({
          date: dayjs(this.year + "-" + this.month + "-" + i).format(
            "YYYY-MM-DD"
          ),
          label: dayjs(this.year + "-" + this.month + "-" + i).format("D"),
          // 是当前的月的日期
          isCurrentMonth: true,
          isWorkday: isWorkday(
            dayjs(`${this.year}-${this.month}-${i}`).format("YYYY-MM-DD")
          ),
          isToday: dayjs(`${this.year}-${this.month}-${i}`).isToday(),
          cnDay: Lunar.fromDate(
            new Date(
              dayjs(`${this.year}-${this.month}-${i}`).format("YYYY-MM-DD")
            )
          ).getDayInChinese(),
        });
      }

      // 后面补上下个月的日期
      const len = 42 - daysLists.length;
      for (let i = 1; i <= len; i++) {
        daysLists.push({
          date: dayjs(`${this.year}-${this.month}`)
            .endOf("month")
            .add(i, "day")
            .format("YYYY-MM-DD"),
          label: dayjs(`${this.year}-${this.month}`)
            .endOf("month")
            .add(i, "day")
            .format("D"),
          isWorkday: isWorkday(
            dayjs(`${this.year}-${this.month}`)
              .endOf("month")
              .add(i, "day")
              .format("YYYY-MM-DD")
          ),
          cnDay: Lunar.fromDate(
            new Date(
              dayjs(`${this.year}-${this.month}`)
                .endOf("month")
                .add(i, "day")
                .format("YYYY-MM-DD")
            )
          ).getDayInChinese(),
        });
      }
      // dataList 分割成7组，每组7个
      this.daysLists = this.changDataList(daysLists);
    },
    changDataList(daysLists) {
      let lists = [];
      for (let index = 0; index < daysLists.length; index++) {
        if (index % 7 === 0) {
          lists.push(daysLists.slice(index, index + 7));
        }
      }
      return lists;
    },
    handleAddMonth() {
      if (this.month == 12) {
        this.year++;
        this.month = 1;
      } else if (this.month < 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month++;
      }

      this.getDateLists();
      this.getFirstDay();
    },
    // 计算每月的第一天并高亮
    getFirstDay() {
      // 计算当前月的第一天，添加高亮样式
      const firstDay = dayjs(`${this.year}-${this.month}`)
        .startOf("month")
        .format("YYYY-MM-DD");
      this.daysLists = this.daysLists.flat().map((item) => {
        if (item.date == firstDay) {
          this.$set(item, "isCurrent", true);
        }
        return item;
      });
      const lists = this.daysLists.flat().map((item) => {
        if (item.date == firstDay) {
          this.$set(item, "isCurrent", true);
        }
        return item;
      });

      this.daysLists = this.changDataList(lists);
    },
    handleMinusMonth() {
      if (this.month == 1) {
        this.year--;
        this.month = 12;
      } else if (this.month > 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month--;
      }
      this.getDateLists();
      this.getFirstDay();
    },
    handleClick(now) {
      const lists = this.daysLists.flat();
      lists.forEach((item) => {
        if (now == item) {
          this.$set(item, "isCurrent", true);
        } else {
          this.$set(item, "isCurrent", false);
        }
      });
      this.daysLists = this.changDataList(lists);
    },
    handleBackToday() {
      this.year = dayjs().format("YYYY");
      this.month = dayjs().format("M");
      this.getDateLists();
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar-box {
  max-width: 900px;
  border: 1px solid #d7d7d7;
  position: relative;
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
  .back-today {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  margin: 0 auto;
  .calendar-title {
    display: flex;
    justify-content: space-between;
    height: 80px;
    background-color: #d7d7d7;
    .calendar-title-day {
      width: 100px;
      line-height: 80px;
      text-align: center;
    }
  }
  .calendar-body {
    .calendar-week {
      display: flex;
      justify-content: space-between;
      height: 80px;
      .calendar-day {
        color: #d7d7d7;
        width: 100px;
        line-height: 80px;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        &.current {
          color: #333;
        }
        &.today {
          color: #fff;
          background-color: red;
        }
        &.isCurrent {
          /* color: #333; */
          border: 1px solid red;
        }
        &-rest {
          position: absolute;
          width: 20px;
          height: 20px;
          line-height: 20px;
          background-color: rgb(117, 117, 117);
          color: #fff;
          border-radius: 50%;
          font-size: 12px;
          top: 20px;
        }
        &-today {
        }
      }
    }
  }
}
</style>

<template>
  <div id="example-full">
    <div class="calendar-controls">
      <div v-if="state.message" class="notification is-success">
        {{ state.message }}
      </div>
      <BaseCard>
        <h4 class="title is-5">캘린더 설정</h4>

        <div class="field">
          <label class="label">기간 설정</label>
          <div class="control">
            <div class="select">
              <select v-model="state.displayPeriodUom">
                <option>month</option>
                <option>week</option>
                <option>year</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">표시 개월 수</label>
          <div class="control">
            <div class="select">
              <select v-model="state.displayPeriodCount">
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">주 시작 요일</label>
          <div class="control">
            <div class="select">
              <select v-model="state.startingDayOfWeek">
                <option
                  v-for="(d, index) in dayNames"
                  :key="index"
                  :value="index"
                >
                  {{ d }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="checkbox">
            <input v-model="state.useTodayIcons" type="checkbox" />
            Use icon for today's period
          </label>
        </div>

        <div class="field">
          <label class="checkbox">
            <input v-model="state.displayWeekNumbers" type="checkbox" />
            주 번호 표시
          </label>
        </div>

        <div class="field">
          <label class="checkbox">
            <input v-model="state.showTimes" type="checkbox" />
            Show times
          </label>
        </div>

        <div class="field">
          <!-- Tooltip 설정. 카테고리로 활용 가능할까? -->
          <label class="label">Tooltips</label>
          <label class="checkbox">
            <input v-model="state.useDefaultTheme" type="checkbox" />
            Default CSS
          </label>
        </div>

        <div class="field">
          <label class="checkbox">
            <input v-model="state.useHolidayTheme" type="checkbox" />
            Holidays
          </label>
        </div>

        <BaseBtn
          class="border border-info text-info hover:bg-info hover:text-white mb-3 mr-3"
          @click="onClickRequestBtn"
          >휴가 신청</BaseBtn
        >
      </BaseCard>

      <!-- 일정 추가 -->
      <!-- <div class="box">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="state.newItemTitle" class="input" type="text" />
          </div>
        </div>

        <div class="field">
          <label class="label">Start date</label>
          <div class="control">
            <input v-model="state.newItemStartDate" class="input" type="date" />
          </div>
        </div>

        <div class="field">
          <label class="label">End date</label>
          <div class="control">
            <input v-model="state.newItemEndDate" class="input" type="date" />
          </div>
        </div>

        <button class="button is-info" @click="clickTestAddItem">
          Add Item
        </button>
      </div> -->
    </div>
    <div class="calendar-parent">
      <CalendarView
        :items="state.items"
        :show-date="state.showDate"
        :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
        :enable-drag-drop="false"
        :disable-past="state.disablePast"
        :disable-future="state.disableFuture"
        :show-times="state.showTimes"
        :date-classes="myDateClasses()"
        :display-period-uom="state.displayPeriodUom"
        :display-period-count="state.displayPeriodCount"
        :starting-day-of-week="state.startingDayOfWeek"
        :class="themeClasses"
        :period-changed-callback="periodChanged"
        :current-period-label="state.useTodayIcons ? 'icons' : ''"
        :displayWeekNumbers="state.displayWeekNumbers"
        :enable-date-selection="true"
        :selection-start="state.selectionStart"
        :selection-end="state.selectionEnd"
        @date-selection-start="setSelection"
        @date-selection="setSelection"
        @date-selection-finish="finishSelection"
        @drop-on-date="onDrop"
        @click-date="onClickDay"
        @click-item="onClickItem"
      >
        <template #header="{ headerProps }">
          <CalendarViewHeader
            :header-props="headerProps"
            @input="setShowDate"
          />
        </template>
      </CalendarView>
    </div>
  </div>
</template>

<script>
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMath,
} from 'vue-simple-calendar'
import { onMounted, reactive, computed, ref, onUpdated } from 'vue'

import { getHolidays } from '@/api/calendar-api.js'
import router from '@/router/index.js'

// 캘린더 규격 css
import '/node_modules/vue-simple-calendar/dist/style.css'

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  setup() {
    const thisMonth = (d, h, m) => {
      const t = new Date()
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
    }

    const state = reactive({
      /* Show the current month, and give it some fake items to show */
      showDate: thisMonth(1),
      message: '',
      startingDayOfWeek: 0,
      disablePast: false,
      disableFuture: false,
      displayPeriodUom: 'month',
      displayPeriodCount: 1,
      displayWeekNumbers: false,
      showTimes: true,
      selectionStart: undefined,
      selectionEnd: undefined,
      newItemTitle: '',
      newItemStartDate: '',
      newItemEndDate: '',
      useDefaultTheme: false,
      useHolidayTheme: true,
      useTodayIcons: false,
      items: [
        /*{
			id: "e0",
			startDate: "2018-01-05",
		},*/
        {
          id: 'e1',
          startDate: thisMonth(15, 0, 0),
          title: 'First',
        },
        {
          id: 'e2',
          startDate: thisMonth(15),
          title: 'Single-day item with a long title',
        },
        {
          id: 'e3',
          startDate: thisMonth(7, 9, 25),
          endDate: thisMonth(10, 16, 30),
          title: 'Multi-day item with a long title and times',
        },
        {
          id: 'e4',
          startDate: thisMonth(20),
          title: 'My Birthday!',
          classes: 'birthday',
          url: 'https://en.wikipedia.org/wiki/Birthday',
        },
      ],
    })

    // 지역 설정
    const userLocale = computed(() => CalendarMath.getDefaultBrowserLocale())

    const dayNames = computed(() =>
      CalendarMath.getFormattedWeekdayNames(userLocale.value, 'long', 0)
    )

    const themeClasses = computed(() => ({
      'theme-default': state.useDefaultTheme,
    }))

    const myDateClasses = () => {
      const o = {}

      // const theFirst = thisMonth(1)
      // const ides = [2, 4, 6, 9].includes(theFirst.getMonth()) ? 15 : 13
      // const idesDate = thisMonth(ides)
      // o[CalendarMath.isoYearMonthDay(idesDate)] = ['ides']
      // o[CalendarMath.isoYearMonthDay(thisMonth(21))] = [
      //   'do-you-remember',
      //   'the-21st',
      // ]
      // return o
    }

    onMounted(() => {
      state.newItemStartDate = CalendarMath.isoYearMonthDay(
        CalendarMath.today()
      )
      state.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today())

      getHolidays()
        .then((res) => {
          console.log('google calendar api called')

          const list = res.data.items
          console.log
          list.forEach((e) => {
            const description = e.description.substr(0, 3) // 공휴일 or 기념일
            let bgStyle = description == '공휴일' ? 'holiday' : 'anniversary'

            state.items.push({
              id: '1' + Math.random().toString(36).substring(2, 11), // gives an random id
              startDate: e.start.date,
              // endDate: e.end.date,  // 없어도 될 듯
              title: e.summary,
              tooltip: description,
              classes: [bgStyle],
            })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })

    const periodChanged = () => {
      // range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react to them (by loading items, etc.)
      //console.log(eventSource)
      //console.log(range)
    }

    const onClickDay = (d) => {
      state.selectionStart = undefined
      state.selectionEnd = undefined
      state.message = `You clicked: ${d.toLocaleDateString()}`
    }

    const onClickItem = (e) => {
      state.message = `You clicked: ${e.title}`
    }

    const setShowDate = (d) => {
      state.message = `Changing calendar view to ${d.toLocaleDateString()}`
      state.showDate = d
    }

    const setSelection = (dateRange) => {
      state.selectionEnd = dateRange[1]
      state.selectionStart = dateRange[0]
    }

    const finishSelection = (dateRange) => {
      setSelection(dateRange)
      state.message = `You selected: ${
        state.selectionStart?.toLocaleDateString() ?? 'n/a'
      } - ${state.selectionEnd?.toLocaleDateString() ?? 'n/a'}`
    }

    const onDrop = (item, date) => {
      state.message = `You dropped ${item.id} on ${date.toLocaleDateString()}`
      // Determine the delta between the old start date and the date chosen,
      // and apply that delta to both the start and end date to move the item.
      const eLength = CalendarMath.dayDiff(item.startDate, date)
      item.originalItem.startDate = CalendarMath.addDays(
        item.startDate,
        eLength
      )
      item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength)
    }

    const clickTestAddItem = () => {
      state.items.push({
        startDate: CalendarMath.fromIsoStringToLocalDate(
          state.newItemStartDate
        ),
        endDate: CalendarMath.fromIsoStringToLocalDate(state.newItemEndDate),
        title: state.newItemTitle,
        id: 'e' + Math.random().toString(36).substring(2, 11),
      })
      state.message = 'You added a calendar item!'
    }

    const onClickRequestBtn = () => {
      router.push({ path: '/vacations/request' })
    }

    return {
      state,
      userLocale,
      dayNames,
      themeClasses,
      myDateClasses,
      thisMonth,
      periodChanged,
      onClickDay,
      onClickItem,
      setShowDate,
      setSelection,
      finishSelection,
      onDrop,
      clickTestAddItem,
      onClickRequestBtn,
    }
  },
}
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css';
/* For apps using the npm package, the below URLs should reference /node_modules/vue-simple-calendar/dist/css/ instead */
@import '/node_modules/vue-simple-calendar/dist/css/default.css';
@import '/node_modules/vue-simple-calendar/dist/css/gcal.css';

#example-full {
  display: flex;
  flex-direction: row;
  font-family: Calibri, sans-serif;
  width: 96vw;
  min-width: 30rem;
  max-width: 100rem;
  min-height: 40rem;
  margin-left: auto;
  margin-right: auto;
}

#example-full .calendar-controls {
  margin-right: 1rem;
  min-width: 14rem;
  max-width: 14rem;
}

#example-full .calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 80vh;
  background-color: white;
}

/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
#example-full .cv-wrapper.period-month.periodCount-2 .cv-week,
#example-full .cv-wrapper.period-month.periodCount-3 .cv-week,
#example-full .cv-wrapper.period-year .cv-week {
  min-height: 6rem;
}

/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */

/* Add some styling for items tagged with the "birthday" class */
#example-full .theme-default .cv-item.birthday {
  background-color: #e0f0e0;
  border-color: #d7e7d7;
}

#example-full .theme-default .cv-item.birthday::before {
  content: '\1F382'; /* Birthday cake */
  margin-right: 0.5em;
}

/* The following classes style the classes computed in myDateClasses and passed to the component's dateClasses prop. */
#example-full .theme-default .cv-day.ides {
  background-color: #ffe0e0;
}

#example-full .ides .cv-day-number::before {
  content: '\271D';
}

#example-full .cv-day.do-you-remember.the-21st .cv-day-number::after {
  content: '\1F30D\1F32C\1F525';
}

.cv-item {
  text-align: center;
  border-radius: 0.5em;
}

/* my custom */
.holiday {
  background-color: #ff9999 !important;
}

.anniversary {
  background-color: #ccffcc !important;
}

/* .cv-day-number::after {
  content: "";
} */
</style>

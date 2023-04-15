<template>
  <div>
    <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-info">
      <span class="inline-block align-middle mr-8">
        <b class="capitalize">휴가 신청</b>
      </span>
    </div>

    <div id="example-full">
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
          :current-period-label="state.useTodayIcons ? 'icons' : ''"
          :displayWeekNumbers="state.displayWeekNumbers"
          :enable-date-selection="true"
          :selection-start="state.selectionStart"
          :selection-end="state.selectionEnd"
          @date-selection-start="setSelection"
          @date-selection="setSelection"
          @date-selection-finish="finishSelection"
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
      <div class="calendar-controls">
        <BaseCard>
          <label class="label">요청사항 작성</label>

          <div class="field">
            <label class="label">요청대상</label>
            <div class="control">
              <!-- 현재 로그인한 사원의 팀장 -->
              김철수 팀장
            </div>
          </div>

          <div class="field">
            <label class="label">요청사유</label>
            <div class="control">
              <!-- 텍스트필드 -->
              <textarea>ddd</textarea>
            </div>
          </div>

          <div class="field">
            <label class="label">첨부파일</label>
            <div class="control">알아서추가하는방법알아내라</div>
          </div>

          <div class="field">
            <label class="label">요청사항</label>
            <div class="control">
              <!-- 위에서 선택한 내용들이 V-MODEL로 자동으로 반영되도록 반응형 구현하셈 -->
            </div>
          </div>

          <div v-if="state.message" class="notification is-success">
            {{ state.message }}
          </div>
        </BaseCard>
      </div>
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
      disablePast: true,
      disableFuture: false,
      //   displayPeriodUom: 'month',
      //   displayPeriodCount: 1,
      //   displayWeekNumbers: false,
      showTimes: true,
      selectionStart: undefined,
      selectionEnd: undefined,
      newItemTitle: '',
      newItemStartDate: '',
      newItemEndDate: '',
      useDefaultTheme: true,
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

    // 여기서 TO랑 공휴일을 아예 회색으로 칠해 버리기
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

    return {
      state,
      userLocale,
      dayNames,
      themeClasses,
      myDateClasses,
      thisMonth,
      onClickDay,
      onClickItem,
      setShowDate,
      setSelection,
      finishSelection,
      clickTestAddItem,
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
}

#example-full .calendar-controls {
  min-width: 40rem;
  max-width: 40rem;
}

#example-full .calendar-parent {
  margin-right: 1rem;

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

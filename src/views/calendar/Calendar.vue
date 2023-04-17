<template>
  <div id="default-calendar">
    <div class="calendar-controls">
      <BaseCard>
        <div class="text-xl font-bold mb-3">캘린더 설정</div>

        <div class="items-center mb-4">
          <label class="font-semibold">표시 기간 설정</label>
          <div class="mt-1">
            <select
              v-model="state.displayPeriodUom"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="month">월 단위</option>
              <option value="week">주 단위</option>
              <option value="year">연 단위</option>
            </select>
          </div>
        </div>

        <div class="items-center mb-4">
          <label class="font-semibold">표시 개월 수</label>
          <div class="mt-1">
            <select
              v-model="state.displayPeriodCount"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option :value="1">1개월</option>
              <option :value="2">2개월</option>
              <option :value="3">3개월</option>
            </select>
          </div>
        </div>

        <div class="items-center mb-4">
          <label class="font-semibold">주 시작 요일</label>
          <div class="mt-1">
            <select
              v-model="state.startingDayOfWeek"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
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

        <div>
          <div class="mb-2">
            <label class="font-semibold">기타 설정</label>
          </div>

          <div class="flex items-center mb-4">
            <input
              v-model="state.useTodayIcons"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Use icon for today's period</label
            >
          </div>
          <div class="flex items-center mb-4">
            <input
              v-model="state.displayWeekNumbers"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >주 번호 표시하기</label
            >
          </div>

          <div class="flex items-center mb-4">
            <input
              v-model="state.showTimes"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >일정에 시간 표시하기</label
            >
          </div>
          <div class="items-center mb-4">
            <input
              v-model="state.useDefaultTheme"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >캘린더 CSS 적용</label
            >
          </div>
        </div>

        <div class="mt-10">
          <div class="text-center">
            <label class="font-semibold"> {{ todayDate }} 기준</label>
          </div>
          <div class="flex justify-center mt-2">
            <BaseBtn
              class="border border-info text-info hover:bg-info hover:text-white mb-3 mr-3"
              @click="onClickCheckBtn"
              >휴가 정보 확인하기</BaseBtn
            >
          </div>
        </div>

        <div class="flex justify-center mt-5">
          <BaseBtn
            class="border border-info text-info hover:bg-info hover:text-white mb-3 mr-3"
            @click="onClickRequestBtn"
            >휴가 신청하기</BaseBtn
          >
        </div>
      </BaseCard>
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
        :enable-date-selection="false"
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

<script setup>
// 캘린더 규격 css
import '/node_modules/vue-simple-calendar/dist/style.css'
import router from '@/router/index.js'
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMath,
} from 'vue-simple-calendar'
import { onMounted, reactive, computed, ref, onUpdated, watch } from 'vue'
import { getHolidays } from '@/api/calendar-api.js'
import { getMyInfo, getMyTeamSchedule, getVcReqList } from '@/api/index.js'
import store from '@/store/index.js'
import { showComponentInModal } from '@/sweetAlert'
import VacationStatistics from '@/components/VacationStatistics.vue'

const todayDate = computed(() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const date = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${date}`
})

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
  useDefaultTheme: true,
  useTodayIcons: false,
  items: [],
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
}

onMounted(async () => {
  state.newItemStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
  state.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today())

  // 로그인한 사용자의 휴가 리스트
  await getVcReqList('false').then((res) => {
    // console.log(res.data)
    const list = res.data.vcReqs
    list.forEach((e) => {
      // console.log(e)
      const id = '1' + Math.random().toString(36).substring(2, 11) // gives an random id
      state.items.push({
        id: id,
        startDate: e.startDate,
        endDate: e.endDate,
        title: e.vcTypeDto.typeName,
        tooltip: 'mine',
        classes: ['my-vacation'],
      })
    })
  })

  // 팀원 전체의 휴가 리스트
  await getMyTeamSchedule().then((res) => {
    // console.log(res.data)
    const list = res.data
    list.forEach((e) => {
      // console.log(e)
      state.items.push({
        id: '1' + Math.random().toString(36).substring(2, 11), // gives an random id
        startDate: e.startDate,
        endDate: e.endDate,
        title:
          e.empDto.name + ' ' + e.empDto.position + ' ' + e.vcTypeDto.typeName,
        tooltip: 'team',
        classes: ['team-vacation'],
      })
    })
  })

  await getHolidays().then((res) => {
    console.log('google calendar api called')

    const list = res.data.items
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

  await getMyInfo().then((res) => {
    store.commit('setEmp', res.data)
    // console.log(store.state.emp)
  })
})

const onClickCheckBtn = () => {
  showComponentInModal('나의 휴가 통계', VacationStatistics)
}

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
  // state.message = `You clicked: ${d.toLocaleDateString()}`
}

const onClickItem = (e) => {
  // state.message = `You clicked: ${e.title}`
}

const setShowDate = (d) => {
  // state.message = `Changing calendar view to ${d.toLocaleDateString()}`
  state.showDate = d
}

const setSelection = (dateRange) => {
  state.selectionEnd = dateRange[1]
  state.selectionStart = dateRange[0]
}

const finishSelection = (dateRange) => {
  setSelection(dateRange)
  // state.message = `You selected: ${
  //   state.selectionStart?.toLocaleDateString() ?? 'n/a'
  // } - ${state.selectionEnd?.toLocaleDateString() ?? 'n/a'}`
}

// 사용 x
const onDrop = (item, date) => {
  // state.message = `You dropped ${item.id} on ${date.toLocaleDateString()}`
  // Determine the delta between the old start date and the date chosen,
  // and apply that delta to both the start and end date to move the item.
  const eLength = CalendarMath.dayDiff(item.startDate, date)
  item.originalItem.startDate = CalendarMath.addDays(item.startDate, eLength)
  item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength)
}

// 사용 x
const clickTestAddItem = () => {
  state.items.push({
    startDate: CalendarMath.fromIsoStringToLocalDate(state.newItemStartDate),
    endDate: CalendarMath.fromIsoStringToLocalDate(state.newItemEndDate),
    title: state.newItemTitle,
    id: 'e' + Math.random().toString(36).substring(2, 11),
  })
  // state.message = 'You added a calendar item!'
}

const onClickRequestBtn = () => {
  router.push({ name: '휴가신청' })
}
</script>

<style>
@import '@/assets/css/default-calendar.css';
</style>

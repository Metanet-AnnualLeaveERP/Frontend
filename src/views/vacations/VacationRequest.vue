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
          <form>
            <label
              class="block mb-2 text-xl font-bold text-gray-900 dark:text-white"
              >요청사항 작성</label
            >

            <p class="mb-5">날짜를 먼저 선택해 주세요!</p>

            <div class="field">
              <label
                for="types"
                class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >휴가 유형</label
              >
              <!-- 휴가 유형 get 해서 v-for문으로 select 에 넣기 -->
              <select
                disabled
                v-model="formData.vcType"
                id="types"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                @change="onClickTypes($event)"
              >
                <option selected>유형을 선택하세요</option>
                <option value="연차">연차</option>
                <option value="포상휴가">포상휴가</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>

            <!-- 유형을 선택했을 경우에만 보이도록 설정 -->
            <div class="field">
              <label
                for="alTypes"
                class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >요청 시간</label
              >
              <!-- 휴가 선택일 보이게 설정 -->
              <div>{{ state.selectedDays }}</div>

              <!-- 연차에 한해서만 보이게 설정 / 연차를 하루만 쓸 때 -->
              <!-- 연차(1) or 반차(0.5) -->
              <select
                disabled
                id="alTypes"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="alType"
                @change="onClickAlTypes($event)"
              >
                <option selected>시간을 선택하세요</option>
                <option value="FULL">연차</option>
                <option value="AM">오전 반차</option>
                <option value="PM">오후 반차</option>
              </select>
            </div>

            <div class="field">
              <label
                class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >요청 대상</label
              >
              <span class="ml-5">
                <!-- 연차를 선택했을 경우 자동 승인이 뜨도록 설정 -->
                <!-- 연차이외의 휴가인 경우 현재 로그인한 사원의 팀장 -->
                김철수 팀장
              </span>
            </div>

            <div class="field">
              <label
                for="message"
                class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >요청 사유</label
              >
              <!-- 텍스트필드 -->
              <textarea
                id="message"
                rows="1"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="사유를 입력하세요 (ex. 결혼식 참석)"
              ></textarea>
            </div>

            <div class="field">
              <label
                class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                for="multiple_files"
                >첨부 파일</label
              >
              <!-- input type: file -->
              <input
                class="file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:dark:text-gray-400 file:dark:bg-gray-700 file:dark:border-gray-600 hover:file:bg-gray-100 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                type="file"
                multiple
                @change="uploadFile($event)"
              />
              <p
                class="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                제출해야 할 증명 서류가 있는 경우 파일을 첨부하세요.
              </p>
            </div>

            <label class="text-lg font-bold text-gray-900 dark:text-white"
              >요청사항 확인</label
            >

            <!-- 반응형으로 구현할 것 -->
            <div class="my-req">
              <label
                class="mb-2 text-base font-semibold text-gray-900 dark:text-white"
                >날짜</label
              >
              <span class="ml-5">
                {{ state.selectedDays }}
              </span>
              <br />
              <label
                class="mb-2 text-base font-semibold text-gray-900 dark:text-white"
                >유형</label
              >
              <span class="ml-5">
                <!-- 내가 선택한 유형 -->
                {{ formData.vcType }}
              </span>
              <br />
              <label
                class="mb-2 text-base font-semibold text-gray-900 dark:text-white"
                >총 요청 일수</label
              >
              <span class="ml-5">
                {{ formData.reqDays }}
              </span>

              <p
                class="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300"
                id="req-info"
              >
                승인 시 {{ formData.vcType }} 잔여 일수는 {현재 잔여일수} ->
                {현재 잔여일수 - reqdays}일입니다.
              </p>
            </div>
            <div id="btn-wrapper" class="flex justify-start">
              <BaseBtn
                class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="onSubmit"
              >
                신청하기
              </BaseBtn>
            </div>

            <div v-show="state.message" class="notification is-success">
              {{ state.message }}
            </div>
          </form>
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

import { upload } from '@/api/file.js'

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
      selectedDays: '',
      items: [],
    })

    const formData = reactive({
      // reqDate: '',
      startDate: '',
      endDate: '',
      vcType: '',
      reqDays: '',
      comments: '',
      status: '',
      empId: 0,
    })

    // 연차 시간
    const alType = ref(0)

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

    // 특정 날짜 하루 선택
    const onClickDay = (d) => {
      state.selectionStart = undefined
      state.selectionEnd = undefined
      state.message = `You clicked: ${d.toLocaleDateString()}`
      state.selectedDays = `${d.toLocaleDateString()}`

      // 시작일 및 종료일을 클릭 날짜로 1일 설정
      formData.startDate = d
      formData.endDate = d
      formData.reqDays = 1

      // 날짜를 선택해야 select box 활성화
      document.getElementById('types').disabled = false

      // 연차/반차 select box 활성화
      if (formData.vcType == '연차') {
        document.getElementById('alTypes').disabled = false
      }
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

    // 여러 날짜를 선택한 경우
    const finishSelection = (dateRange) => {
      setSelection(dateRange)
      state.message = `You selected: ${
        state.selectionStart?.toLocaleDateString() ?? 'n/a'
      } - ${state.selectionEnd?.toLocaleDateString() ?? 'n/a'}`

      state.selectedDays = `${
        state.selectionStart?.toLocaleDateString() ?? 'n/a'
      } - ${state.selectionEnd?.toLocaleDateString() ?? 'n/a'}`

      formData.startDate = state.selectionStart
      formData.endDate = state.selectionEnd
      formData.reqDays = getDateDiff(formData.endDate, formData.startDate)

      // 날짜를 선택해야 select box 활성화
      document.getElementById('types').disabled = false

      // 연차/반차 select box 비활성화
      document.getElementById('alTypes').disabled = true
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

    // 휴가 신청 버튼 클릭 시 (Submit form)
    const onSubmit = () => {
      console.log('휴가 신청 버튼 클릭')
      console.log(formData)

      // 업로드한 파일이 있을 때만 호출
      if (file.value != null) {
        submitFile()
      }
    }

    // 휴가 유형 선택 시
    // 호출 시점: 날짜 선택 이후
    const onClickTypes = (e) => {
      if (e.target.value == '연차') {
        document.getElementById('alTypes').disabled = false
      }
    }

    const onClickAlTypes = (e) => {
      switch (e.target.value) {
        case 'FULL':
          formData.reqDays = 1
          break
        case 'AM':
        case 'PM':
          formData.reqDays = 0.5
          break
      }
    }

    // 두 날짜 사이의 차이 일수 구하기
    const getDateDiff = (d1, d2) => {
      const date1 = new Date(d1)
      const date2 = new Date(d2)

      const diffDate = date1.getTime() - date2.getTime()

      return Math.abs(diffDate / (1000 * 60 * 60 * 24)) + 1 // 밀리세컨 * 초 * 분 * 시 = 일
    }

    /*----------파일 관련-----------*/
    const file = ref(null)

    // 로컬에서 파일을 업로드할 때마다 파일 정보를 file.value에 넣어 준다
    const uploadFile = (event) => {
      file.value = event.target.files
      // console.log(11111111111)
      // console.log(file.value)
    }

    // 서버에 파일을 업로드하는 메소드
    const submitFile = () => {
      let formData = new FormData()

      Array.from(file.value).forEach((file) => {
        formData.append('uploadFiles', file)
      })

      upload(formData).then((res) => {
        console.log(res.data)
      })

      // file이 잘 담겼는지 로그 확인용
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
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
      onSubmit,
      formData,
      onClickTypes,
      onClickAlTypes,
      alType,
      uploadFile,
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

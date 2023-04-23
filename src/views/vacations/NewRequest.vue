<template>
  <div v-if="loading">
    <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-info">
      <span class="inline-block align-middle mr-8">
        <b class="capitalize">휴가 신청</b>
      </span>
    </div>

    <div
      id="request-div"
      class="flex lg:flex-row gap-4 justify-between flex-col"
    >
      <div class="request-calendar w-full lg:w-4/5">
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
      <div class="request-form">
        <BaseCard>
          <div>
            <form encType="multipart/form-data" @submit.prevent="onSubmit">
              <label
                class="block mb-2 text-xl font-bold text-gray-900 dark:text-white"
                >요청사항 작성</label
              >

              <div class="field">
                <label
                  for="types"
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >휴가 유형</label
                >
                <!-- 휴가 유형 get 해서 v-for문으로 select 에 넣기 -->
                <select
                  v-model="reqData.vcTypeDto.typeId"
                  id="types"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @change="onChangeTypes($event)"
                >
                  <option value="" selected>유형을 선택하세요</option>
                  <option
                    v-for="(item, index) in vcTypeNames"
                    :key="index"
                    :value="item.typeId"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>

              <p class="mt-5 mb-5">캘린더에서 날짜를 선택해 주세요!</p>

              <!-- 유형을 선택했을 경우에만 보이도록 설정 -->
              <div class="field">
                <label
                  for="alTypes"
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >요청 시간</label
                >
                <!-- 휴가 선택일 보이게 설정 -->
                <div class="">선택 일자: {{ state.selectedDays }}</div>
                <!-- 해당 일자의 잔여 TO가 0이면 -->
                <!-- <div class=""></div> -->

                <!-- 연차에 한해서만 보이게 설정 / 연차를 하루만 쓸 때 -->
                <!-- 연차(1) or 반차(0.5) -->
                <select
                  disabled
                  id="alTypes"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="alType"
                  @change="onChangeAlTypes($event)"
                >
                  <option value="" selected>시간을 선택하세요</option>
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
                  {{ reqTarget }}
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
                  v-model="reqData.comments"
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
                  {{ selectedVcType }}
                </span>
                <br />
                <label
                  class="mb-2 text-base font-semibold text-gray-900 dark:text-white"
                  >총 요청 일수</label
                >
                <span class="ml-5">
                  {{ reqData.reqDays }}
                </span>

                <p
                  class="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300"
                  id="req-info"
                  v-if="remainDays != -999"
                >
                  승인 시 {{ reqData.vcType }} 휴가의 잔여 일수는
                  {{ remainDays }} -> {{ newRemainDays }}일입니다.
                </p>
              </div>
              <div id="btn-wrapper" class="flex justify-between mb-5">
                <BaseBtn
                  disabled
                  id="submitBtn"
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  신청하기
                </BaseBtn>
                <BaseBtn
                  class="text-white bg-light hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  돌아가기
                </BaseBtn>
              </div>
            </form>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import '/node_modules/vue-simple-calendar/dist/style.css'
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMath,
} from 'vue-simple-calendar'
import { onMounted, reactive, computed, ref, watch } from 'vue'
import {
  createRequest,
  getVcRemainInfo,
  getEntireRemainVcTo,
} from '@/api/index.js'
import store from '@/store/index.js'
import { warningAlert, successToast } from '@/sweetAlert'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'

const route = useRoute()

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
  showTimes: true,
  selectionStart: undefined,
  selectionEnd: undefined,
  newItemTitle: '',
  newItemStartDate: '',
  newItemEndDate: '',
  useDefaultTheme: true,
  selectedDays: '',
  items: [],
  remainVcTo: [],
})

const reqData = reactive({
  startDate: '',
  endDate: '',
  vcTypeDto: {
    typeId: '',
  },
  reqDays: 0,
  comments: '',
  status: '',
  empDto: {
    empId: store.state.emp.empId,
  },
})

const loading = ref(false)

// 휴가 유형
const vcTypeNames = ref([])
const selectedVcType = ref('')

// 휴가 잔여일 정보 리스트
const vcTypeRemains = ref([])
const remainDays = ref(-999)
const newRemainDays = ref(-999)

// remainDays < newRemainDays일 경우
const notAcceptable = ref(false)

// 나의 상사
const manager = store.state.mgr

// 요청 대상
const reqTarget = ref(null)

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

// 잔여 TO가 0인 경우 회색으로 색칠하는 date css 추가
const myDateClasses = () => {
  const o = {}
  state.remainVcTo.forEach((e) => {
    // console.log(e)
    if (e.remainTO == 0) {
      o[e.date] = ['bg-gray-200']
    }
  })

  return o
}

// 타입이 바뀔 때마다 잔여일 계산
watch(
  () => reqData.vcTypeDto.typeId,
  (newValue, oldValue) => {
    // 연차
    if (newValue == 1) {
      selectedVcType.value = '연차'
      remainDays.value = vcTypeRemains?.value?.annual?.remainDays
    } else {
      vcTypeRemains.value.reward.forEach((e) => {
        if (newValue == e.vcTypeDto.typeId) {
          selectedVcType.value = e.vcTypeDto.typeName
          remainDays.value = e.cnt
        }
      })
    }
    newRemainDays.value = remainDays.value - reqData.reqDays
  }
)

// 요청일이 계산될 때마다 새로운 잔여일 계산
watch(
  () => reqData.reqDays,
  (newValue, oldValue) => {
    // 잔여일 값을 구한 이후에만 변경되도록 제한
    if (remainDays.value != -999) {
      newRemainDays.value = remainDays.value - reqData.reqDays
    }
  }
)

// 계산된 잔여일이 음수가 되면 요청일이 잔여일보다 크다는 의미
watch(
  () => newRemainDays.value,
  (newValue, oldValue) => {
    if (newValue < 0) {
      warningAlert(
        '요청일수가 잔여일수보다 큽니다.\n날짜를 다시 선택해 주세요.'
      )
      notAcceptable.value = true
    } else {
      notAcceptable.value = false
    }
  }
)

// yyyy-mm-dd로 Date 객체 포맷 변경하는 메소드
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// yyyy년 mm월 dd일로 포맷 변경하는 메소드
const formatDateToKorean = (d) => {
  // Date 객체로 변환
  const date = new Date(d)

  // 월, 일을 두 자리 숫자로 표현
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  // 변환된 문자열 생성
  return `${date.getFullYear()}년 ${month}월 ${day}일`
}

const holidaySize = route.query.holidaySize

onMounted(async () => {
  const queryItems = JSON.parse(route.query.items)
  // console.log(queryItems)
  state.items = queryItems

  state.newItemStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
  state.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today())

  // 부서의 잔여 TO 조회
  await getEntireRemainVcTo().then((res) => {
    // console.log(res.data)
    state.remainVcTo = res.data
    // myDateClasses()
  })

  // vcType 조회
  await getVcRemainInfo().then((res) => {
    vcTypeRemains.value = res.data

    if (res.data.annual != null) {
      vcTypeNames.value.push({ typeId: 1, name: '연차' })
    }
    res.data.reward.forEach((e) => {
      vcTypeNames.value.push({
        typeId: e.vcTypeDto.typeId,
        name: e.vcTypeDto.typeName,
      })
    })
    loading.value = true

    // console.log(vcTypeNames.value)
    // console.log(vcTypeRemains.value)
  })
})

// 특정 날짜 하루 선택
const onClickDay = (d) => {
  state.selectionStart = undefined
  state.selectionEnd = undefined
  state.message = `You clicked: ${d.toLocaleDateString()}`
  state.selectedDays = `${d.toLocaleDateString()}`

  // 시작일 및 종료일을 클릭 날짜로 1일 설정
  console.log(d)
  reqData.startDate = d
  reqData.endDate = d
  reqData.reqDays = 1

  // 연차/반차 select box 활성화
  if (reqData.vcTypeDto.typeId == 1) {
    document.getElementById('alTypes').disabled = false
  }

  // 잔여 TO 계산
  const format = formatDate(d)
  const result = state.remainVcTo.find((item) => item.date === format)
  if (result && result.remainTO == 0) {
    const formatKorean = formatDateToKorean(d)
    warningAlert(
      formatKorean + '에는 TO가 가득 찼습니다. 다른 날을 선택해 주세요.'
    )
    document.getElementById('submitBtn').disabled = true
  } else {
    document.getElementById('submitBtn').disabled = false
  }

  minusHolidayFromReqDays()
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

  reqData.startDate = state.selectionStart
  reqData.endDate = state.selectionEnd
  reqData.reqDays = getDateDiff(reqData.endDate, reqData.startDate)

  // 날짜를 선택해야 select box 활성화
  document.getElementById('types').disabled = false

  // 연차/반차 select box 비활성화
  document.getElementById('alTypes').disabled = true

  // 두 날짜 사이의 일수 계산
  const startDate = formatDate(state.selectionStart)
  const endDate = formatDate(state.selectionEnd)
  const diff = getDateDiff(startDate, endDate)

  // 일수만큼 반복문을 돌리면서 해당 날짜의 잔여 TO 계산
  for (let i = 0; i < diff; i++) {
    const date = new Date(state.selectionStart.getTime()) // 현재 날짜와 시간을 복사한 Date 객체 생성
    date.setDate(state.selectionStart.getDate() + i) // 현재 날짜에 i일을 더한 값을 구함
    // console.log(date) // 더한 날짜 출력

    const format = formatDate(date)
    const result = state.remainVcTo.find((item) => item.date === format)
    if (result && result.remainTO == 0) {
      // 여러 date 중 하나라도 잔여 TO가 없는 날이 있다면 버튼을 disable 하고 반복 검사 종료

      const formatKorean = formatDateToKorean(date)
      warningAlert(
        formatKorean + '에는 TO가 가득 찼습니다. 다른 날을 선택해 주세요.'
      )
      document.getElementById('submitBtn').disabled = true
      break
    } else {
      document.getElementById('submitBtn').disabled = false
    }
  }

  // 신청일이 오늘보다 이전 날짜이면 신청 못하도록 버튼 막음
  const today = new Date()
  if (reqData.startDate < today) {
    document.getElementById('submitBtn').disabled = true
  } else {
    document.getElementById('submitBtn').disabled = false
  }

  minusHolidayFromReqDays()
}

const clickTestAddItem = () => {
  state.items.push({
    startDate: CalendarMath.fromIsoStringToLocalDate(state.newItemStartDate),
    endDate: CalendarMath.fromIsoStringToLocalDate(state.newItemEndDate),
    title: state.newItemTitle,
    id: 'e' + Math.random().toString(36).substring(2, 11),
  })
  state.message = 'You added a calendar item!'
}

// 휴가 유형 선택 시
const onChangeTypes = (e) => {
  // 연차
  if (e.target.value == 1) {
    reqTarget.value = '자동승인'
  } else {
    if (store.state.emp.position == '팀원') {
      reqTarget.value = manager.name + ' ' + manager.position
    } else {
      reqTarget.value = '인사팀장'
    }
  }

  if (reqData.reqDays == 1 && e.target.value == 1) {
    document.getElementById('alTypes').disabled = false
  } else {
    document.getElementById('alTypes').disabled = true
  }
}

// 연차/오전반차/오후반차 선택 시 reqDays 설정
const onChangeAlTypes = (e) => {
  switch (e.target.value) {
    case 'FULL':
      reqData.reqDays = 1
      reqData.vcTypeDto.typeId = 1
      break
    case 'AM':
      reqData.vcTypeDto.typeId = 2
    case 'PM':
      reqData.vcTypeDto.typeId = 3
      reqData.reqDays = 0.5
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

const addDays = (date, days) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

/*===========휴가 신청 api 호출============*/
const file = ref(null)
const formData = ref(null)

// 휴가 신청 버튼 클릭 시 (Submit form)
const onSubmit = () => {
  // console.log(reqData)
  // 휴가 유형을 선택 안 했을 경우 return
  if (!reqData.vcTypeDto.typeId || !reqData.vcTypeDto.typeId === '') {
    warningAlert('휴가유형을 선택해주세요')
    return
  }
  if (notAcceptable.value) {
    warningAlert('요청일수가 잔여일수보다 큽니다.\n날짜를 다시 선택해 주세요.')
    return
  }
  // 선택 유형이 연차면 상태 = '자동승인' / 타 휴가면 '대기중'
  reqData.status = reqData.vcTypeDto.typeId == 1 ? '자동승인' : '대기중'

  formData.value = new FormData()
  // 객체를 JSON 타입으로 변환하여 Blob 객체 생성
  formData.value.append(
    'request',
    new Blob([JSON.stringify(reqData)], {
      type: 'application/json',
    })
  )
  // 업로드한 파일이 있을 때 reqData에 append
  if (file.value != null) {
    appendFile()
  }
  createRequest(formData.value).then(() => {
    successToast('휴가 신청이 완료되었습니다.')
    router.go(-1)
  })
}

// 신청 날짜 중 공휴일이 있는지 검사
const minusHolidayFromReqDays = () => {
  var cnt = 0
  for (let i = 1; i <= holidaySize; i++) {
    if (state.items[i].tooltip === '공휴일') {
      let date = new Date(state.items[i].startDate)
      // console.log(reqData.endDate)
      const endD = new Date(reqData.endDate)

      const newEndDate = addDays(reqData.endDate, 1)

      if (reqData.startDate <= date && date <= newEndDate) {
        // console.log(new Date(state.items[i].startDate))
        cnt++
      }
    }
  }
  // console.log(reqData.endDate)
  // console.log(cnt)
  // console.log(reqData.reqDays)
  reqData.reqDays = reqData.reqDays - cnt
}

/*===========파일 관련============*/

// 로컬에서 파일을 업로드할 때마다 파일 정보를 file.value에 넣어 준다
const uploadFile = (event) => {
  file.value = event.target.files
}

// reqData를 생성하여 file들을 append (multipart data 생성)
const appendFile = () => {
  Array.from(file.value).forEach((f) => {
    formData.value.append('uploadFiles', f)
  })
  // file이 잘 담겼는지 로그 확인용
  // console.log('filesssss')
  // for (var pair of formData.value.entries()) {
  //   console.log(pair[0] + ', ' + pair[1])
  // }
}
</script>

<style></style>

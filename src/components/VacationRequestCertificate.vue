<script>
import { onMounted, ref } from 'vue'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const alType = ref(false)
    const startDate = ref('')
    const endDate = ref('')

    onMounted(() => {
      //   console.log(props.item)
      const typeName = props.item.vcTypeDto.typeName
      if (props.item.reqDays == 1 && typeName == '연차') {
        console.log('연차이고 하루만 신청했을 경우 반차인지 아닌지 표시')
        alType.value = true
      }

      // Date 객체로 변환
      const start = new Date(props.item.startDate)
      const end = new Date(props.item.endDate)

      // 월, 일을 두 자리 숫자로 표현
      const startMonth = String(start.getMonth() + 1).padStart(2, '0')
      const startDay = String(start.getDate()).padStart(2, '0')

      const endMonth = String(end.getMonth() + 1).padStart(2, '0')
      const endDay = String(end.getDate()).padStart(2, '0')

      // 변환된 문자열 생성
      startDate.value = `${start.getFullYear()}년 ${startMonth}월 ${startDay}일`
      endDate.value = `${start.getFullYear()}년 ${endMonth}월 ${endDay}일`
    })

    return {
      alType,
      startDate,
      endDate,
    }
  },
}
</script>

<template>
  <div class="container mx-auto text-center text-sm">
    <table
      class="__se_tbl"
      style="
        width: 800px;
        border-collapse: collapse !important;
        color: black;
        background: white;
        border: 0px solid black;

        font-family: malgun gothic, dotum, arial, tahoma;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <!-- Header -->

      <tbody>
        <tr>
          <td
            style="
              width: 300px;
              padding: 3px !important;
              border: 0px solid black;
              height: 90px !important;
              font-size: 22px;
              font-weight: bold;
              text-align: center;
              vertical-align: middle;
            "
            colspan="2"
            class="dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l bg-white dark:bg-foreground dark:text-white"
          >
            휴가 확인서
          </td>
        </tr>
        <tr>
          <td
            style="width: 300px; border: 0; padding: 0 !important"
            class="dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l bg-white dark:bg-foreground dark:text-white"
          >
            <table
              class="__se_tbl"
              style="
                margin: 0px;
                border: 1px solid black;
                border-image: none;
                font-family: malgun gothic, dotum, arial, tahoma;
                border-collapse: collapse !important;
              "
            >
              <!-- User -->

              <tbody>
                <tr>
                  <td
                    class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
                    style="
                      width: 100px;
                      height: 22px;
                      vertical-align: middle;
                      border: 1px solid black;
                      text-align: center;
                      padding: 3px !important;
                    "
                  >
                    기안자
                  </td>

                  <td
                    class="bg-white dark:bg-foreground dark:text-white"
                    style="
                      width: 200px;
                      height: 22px;
                      vertical-align: middle;
                      border: 1px solid black;
                      text-align: left;
                      padding: 3px !important;
                    "
                  >
                    <span
                      unselectable="on"
                      contenteditable="false"
                      class="comp_wrap"
                      data-cid="0"
                      data-dsl="{{label:draftUser}}"
                      data-wrapper=""
                      style=""
                      data-value=""
                      data-autotype=""
                      ><span class="comp_item">{{ item.empDto.name }}</span
                      ><span
                        contenteditable="false"
                        class="comp_active"
                        style="display: none"
                      >
                        <span class="Active_dot1"></span
                        ><span class="Active_dot2"></span>
                        <span class="Active_dot3"></span
                        ><span class="Active_dot4"></span>
                      </span>
                      <span
                        contenteditable="false"
                        class="comp_hover"
                        data-content-protect-cover="true"
                        data-origin="0"
                      >
                        <a
                          contenteditable="false"
                          class="ic_prototype ic_prototype_trash"
                          data-content-protect-cover="true"
                          data-component-delete-button="true"
                        ></a>
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
                    style="
                      width: 100px;
                      padding: 3px !important;
                      height: 22px;
                      vertical-align: middle;
                      border: 1px solid black;
                      text-align: center;
                    "
                  >
                    기안부서
                  </td>
                  <td
                    style="
                      width: 200px;
                      padding: 3px !important;
                      height: 22px;
                      vertical-align: middle;
                      border: 1px solid black;
                      text-align: left;
                    "
                  >
                    <span
                      unselectable="on"
                      contenteditable="false"
                      class="comp_wrap"
                      data-cid="1"
                      data-dsl="{{label:draftDept}}"
                      data-wrapper=""
                      style=""
                      data-value=""
                      data-autotype=""
                      ><span class="comp_item">기안부서</span
                      ><span
                        contenteditable="false"
                        class="comp_active"
                        style="display: none"
                      >
                        <span class="Active_dot1"></span
                        ><span class="Active_dot2"></span>
                        <span class="Active_dot3"></span
                        ><span class="Active_dot4"></span>
                      </span>
                      <span
                        contenteditable="false"
                        class="comp_hover"
                        data-content-protect-cover="true"
                        data-origin="1"
                      >
                        <a
                          contenteditable="false"
                          class="ic_prototype ic_prototype_trash"
                          data-content-protect-cover="true"
                          data-component-delete-button="true"
                        ></a>
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
                    style="
                      width: 100px;
                      padding: 3px !important;
                      height: 22px;
                      vertical-align: middle;
                      border: 1px solid black;
                      text-align: center;
                    "
                  >
                    기안일
                  </td>
                  <td
                    style="
                      width: 200px;
                      padding: 3px !important;
                      height: 22px;
                      vertical-align: middle;
                      border: 1px solid black;
                      text-align: left;
                    "
                  >
                    <span
                      unselectable="on"
                      contenteditable="false"
                      class="comp_wrap"
                      data-cid="2"
                      data-dsl="{{label:draftDate}}"
                      data-wrapper=""
                      style=""
                      data-value=""
                      data-autotype=""
                      ><span class="comp_item">{{ item?.reqDate }}</span
                      ><span
                        contenteditable="false"
                        class="comp_active"
                        style="display: none"
                      >
                        <span class="Active_dot1"></span
                        ><span class="Active_dot2"></span>
                        <span class="Active_dot3"></span
                        ><span class="Active_dot4"></span>
                      </span>
                      <span
                        contenteditable="false"
                        class="comp_hover"
                        data-content-protect-cover="true"
                        data-origin="2"
                      >
                        <a
                          contenteditable="false"
                          class="ic_prototype ic_prototype_trash"
                          data-content-protect-cover="true"
                          data-component-delete-button="true"
                        ></a>
                      </span>
                    </span>
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <br />

    <table
      class="__se_tbl"
      style="
        width: 800px;
        margin-top: 0px;
        border-collapse: collapse !important;
        color: black;
        background: white;
        border: 1px solid black;

        font-family: malgun gothic, dotum, arial, tahoma;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <tbody>
        <tr>
          <td
            class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
            style="
              padding: 5px;
              border: 1px solid black;
              height: 25px;
              text-align: center;
              vertical-align: middle;
            "
          >
            휴가 종류
          </td>
          <td
            class="bg-white dark:bg-foreground dark:text-white"
            style="
              padding: 5px;
              border: 1px solid black;
              height: 25px;
              text-align: left;
              font-weight: normal;
              vertical-align: middle;
            "
          >
            <span class="mr-5" v-if="item.vcTypeDto.typeName == '연차'">
              ☑ 연차
            </span>
            <span class="mr-5" v-else> ☐ 연차 </span>
            <span class="mr-5" v-if="item.vcTypeDto.typeName == '보상'">
              ☑ 보상
            </span>
            <span class="mr-5" v-else> ☐ 보상 </span>
            <span class="mr-5" v-if="item.vcTypeDto.typeName == '포상'">
              ☑ 포상
            </span>
            <span class="mr-5" v-else> ☐ 포상 </span>
          </td>
        </tr>
        <tr>
          <td
            class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
            style="
              padding: 5px;
              border: 1px solid black;
              height: 25px;
              text-align: center;
              vertical-align: middle;
            "
          >
            휴가 기간
          </td>
          <td
            class="bg-white dark:bg-foreground dark:text-white"
            style="
              padding: 3px;
              border: 1px solid black;
              width: 700px;
              height: 22px;
              text-align: left;
              vertical-align: middle;
            "
            v-if="item.reqDays != 1"
          >
            {{ startDate }} - {{ endDate }}
          </td>
          <td
            class="bg-white dark:bg-foreground dark:text-white"
            style="
              padding: 3px;
              border: 1px solid black;
              width: 700px;
              height: 22px;
              text-align: left;
              vertical-align: middle;
            "
            v-else
          >
            {{ item.startDate }} - {{ item?.endDate }}
          </td>
        </tr>
        <tr v-if="alType">
          <td
            class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
            style="
              padding: 5px;
              border: 1px solid black;
              height: 25px;
              text-align: center;
              vertical-align: middle;
            "
          >
            반차 여부
          </td>
          <td
            class="bg-white dark:bg-foreground dark:text-white"
            style="
              padding: 5px;
              border: 1px solid black;
              height: 25px;
              text-align: left;
              font-weight: normal;
              vertical-align: middle;
            "
          >
            <span
              id="vacationHalfArea"
              style="
                font-family: malgun gothic, dotum, arial, tahoma;
                font-size: 11pt;
                line-height: normal;
                margin-top: 0px;
                margin-bottom: 0px;
              "
            ></span>
          </td>
        </tr>
        <tr>
          <td
            class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
            style="
              padding: 5px;
              border: 1px solid black;
              height: 25px;
              text-align: center;
              vertical-align: middle;
            "
          >
            휴가 일수
          </td>
          <td
            class="bg-white dark:bg-foreground dark:text-white"
            style="
              padding: 3px;
              border: 1px solid black;
              width: 700px;
              height: 22px;
              text-align: left;
              vertical-align: middle;
            "
          >
            총 {{ item.reqDays }} 일
          </td>
        </tr>
        <tr>
          <td
            class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
            style="
              padding: 5px;
              border: 1px solid black;
              height: 80px;
              text-align: center;
              vertical-align: middle;
            "
          >
            휴가 사유
          </td>
          <td
            class="bg-white dark:bg-foreground dark:text-white"
            style="
              padding: 3px;
              border: 1px solid black;
              width: 700px;
              height: 100px;
              text-align: left;
              vertical-align: top;
            "
          >
            {{ item.comments }}
          </td>
        </tr>
        <tr>
          <td
            class="bg-gray-300 font-bold dark:bg-gray-700 dark:text-white"
            colspan="2"
            style="
              width: 800px;
              padding: 20px !important;
              height: 22px;
              vertical-align: middle;
              border: 1px solid black;
              text-align: left;
            "
          >
            1. 연차의 사용은 근로기준법에 따라 전년도에 발생한 개인별 잔여
            연차에 한하여 사용함을 원칙으로 한다. 단, 최초 입사 시에는 근로
            기준법에 따라 발생 예정된 연차를 차용하여 월 1회 사용할 수 있다.<br />
            2. 경조사 휴가는 행사일을 증명할 수 있는 가족 관계 증명서 또는 등본,
            청첩장 등 제출<br />
            3. 공가(예비군/민방위)는 사전에 통지서를, 사후에 참석증을 반드시
            제출
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

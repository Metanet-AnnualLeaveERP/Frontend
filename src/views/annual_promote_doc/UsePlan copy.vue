<template>
<div>
<!-- 사용계획서 폼 -->
<!--상단-->
<table width="644">
      <tr>
        <td height="93" class="form16b1">잔여연차휴가 사용계획서</td>
        <td id="tms_auto_sign" style="width: 1%; white-space: nowrap;"></td>
      </tr>
</table>
<!--여백-->
 <div class="blank01"></div>
 
 
<!-- 문서정보 -->
<table width="644" class="form9 bordertop2">
 <tr>
    <td width="123" class="bold stitle">성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명 </td>
    <td width="201" class="border-right_dotted"><div id="user1"></div></td>
    <td width="111" class="bold stitle">작성일자</td>
    <td width="209"><div style="cursor:pointer" id="ymd3" onClick="javascript:fun('calender','ymd3','YYYY.MM.DD.');"></div></td>
  </tr>
  <tr>
    <td width="123" class="bold stitle">부 서 명</td>
    <td width="201" class="border-right_dotted"><div id="busu1"></div></td>
    <td width="111" class="bold stitle">문서번호</td>
    <td width="209"><div id="dono" ></div></td>
  </tr>
  </table>
 

 <!--여백-->
 <div class="blank01"></div>
 
 <div tms_edit class="middle tmsedit minheight50 textcenter"> 
      통지받은 “미사용 연차유급휴가일수”및“휴가사용 계획서 제출&quot;에 의거하여<br>
      아래와 같이 본인의 미사용 연차유급휴가 사용시기를 지정하여 통보 드립니다.
 </div>
 
 <div class="blank01"></div>
 
 <!-- 문서정보 -->
  <table width="644" class="form9_contents bordertop2"> 
  <tr>
    <td class="bold stitle">연차유급휴가 내역</td>
  </tr>
  <tr>
    <td style="padding:0; border-bottom:0;">
     <table width="100%" class="form9_middle">
      <tr>
        <td class="textcenter border-right_dotted minheight50">연차유급휴가<br>발생대상기간</td>
        <td class="textcenter border-right_dotted">연차유급휴가<br>사용대상기간</td>
        <td class="textcenter border-right_dotted">발생연차<br>[A]</td>
        <td class="textcenter border-right_dotted">사용연차<br>[B]</td>
        <td class="textcenter">미사용<br>[A-B]</td>
      </tr>
	  <tr>
		<td class="textcenter border-right_dotted" ><div style="width:80px; cursor:pointer; display:inline-block;" id="ymd1" onClick="javascript:fun('calender','ymd1','YYYY.MM.DD');"></div>
		<div style="display:inline-block;">~</div>
		<div style="width:80px; cursor:pointer; display:inline-block;" id="ymd2" onClick="javascript:fun('calender','ymd2','YYYY.MM.DD');"></div>
		</td>
		<td class="textcenter border-right_dotted">
		<div style="width:80px; cursor:pointer; display:inline-block;" id="ymd4" onClick="javascript:fun('calender','ymd4','YYYY.MM.DD');"></div>
		<div style="display:inline-block;">~</div>
		<div style="width:80px; cursor:pointer; display:inline-block;" id="ymd5" onClick="javascript:fun('calender','ymd5','YYYY.MM.DD');"></div>
		</td>
		<td class="textcenter border-right_dotted" ><div tms_edit class="tmsedit bold" id="aa1" onBlur="calc_value1(this)">15</div></td>
		<td class="textcenter border-right_dotted" ><div tms_edit class="tmsedit bold" id="bb1" onBlur="calc_value1(this)">10</div></td>
		<td class="textcenter"><div class="tmsedit bold" id="cc1">5</div></td>
	  </tr>
     </table>	
	</td>
  </tr>
  </table>
  
  <!--여백-->
 <div class="blank01"></div>
 
  <!-- 문서정보 -->
  <table width="644" class="form9_contents bordertop2"> 
  <tr>
    <td class="bold stitle">잔여 연차유급휴가 시기 지정 (해당월별로 일자를 기입해 주세요.)</td>
  </tr>
  <tr>
	<td class="textcenter" height="30" ><div style="width:80px; cursor:pointer; display:inline-block;" id="ymd6" onClick="javascript:fun('calender','ymd6','YYYY.MM.DD');"></div>
	<div style="display:inline-block;">~</div>
	<div style="width:80px; cursor:pointer; display:inline-block;" id="ymd7" onClick="javascript:fun('calender','ymd7','YYYY.MM.DD');"></div>
	</td>
  </tr>
  <tr>
    <td style="padding:0; border-bottom:0;">
		<table width="100%" class="form9_middle">
		  <tr>
	       <td width="92" class="bold stitle">사 용 월</td>
			<td width="92" class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is1">7월</div></td>
			<td width="92" class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is2"></div></td>
			<td width="92" class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is3"></div></td>
			<td width="92" class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is4"></div></td>
			<td width="92" class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is5"></div></td>
			<td width="92" class="textcenter" ><div tms_edit class="tmsedit" id="is6"></div></td>
		  </tr>
		  <tr>
	       <td class="bold stitle">사용일수</td>
			<td class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is7">1일</div></td>
			<td class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is8"></div></td>
			<td class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is9"></div></td>
			<td class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is10"></div></td>
			<td class="textcenter border-right_dotted" ><div tms_edit class="tmsedit" id="is11"></div></td>
			<td class="textcenter" ><div tms_edit class="tmsedit" id="is12"></div></td>
		  </tr>
		</table>
	</td>
  </tr>
  <tr>
    <td class="textcenter minheight50" >위 기간에 연차휴가를 사용할 계획이니 승인바랍니다.</td>
  </tr>
</table>

  <!-- 사용계획서 폼 끝 -->  

  
  <!-- 입력 폼 -->
  <div>
    <form @submit.prevent="addDate">
      <label for="startDate">휴가출발일자선택:</label>
      <input v-model="startDate" type="date" id="startDate" name="startDate">
      <label for="endDate">휴가종료일자선택:</label>
      <input v-model="endDate" type="date" id="endDate" name="endDate">
      <BaseBtn
        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        날짜 추가하기
      </BaseBtn>

      <div class="flex justify-end mt-7">

      <BaseBtn
        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="saveDates"
      >
        날짜 저장하기
      </BaseBtn>  
    </div>
    </form>
  </div>
</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { insertUsePlan} from '@/api/index.js'
import { successToast, failToast } from '@/sweetAlert'


export default {
  setup() {
    const route = useRoute()

    const docId = route.params.id

    const startDate = ref(''); // 시작날짜입력
    const endDate = ref('') // 종료날짜입력
    const useDays = ref(0);

    

    const dateList = ref([]) // 저장하는 리스트

    const addDate = () => {

      const calculateDiffInDays = () => {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        const diffInTime = end.getTime() - start.getTime();
        const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
        useDays.value = diffInDays+1;
      }

      calculateDiffInDays();

      dateList.value.push({
        startDate: startDate.value,
        endDate: endDate.value,
        useDays: useDays.value,
        anpDocDto:{docId : docId}    
      })
      console.log(dateList.value)
      console.log(docId) // 왜래키(문서번호)
    }

    // 제출하기버튼
    const saveDates = () => { 
      insertUsePlan(dateList.value).then((res) => {
        console.log(res.data)
        successToast('저장이 완료되었습니다.')
      }).catch(()=>{
        failToast('오류가 발생했습니다.')
      })
        
    } 

    return {
      startDate,
      endDate,
      dateList,
      addDate,
      saveDates
    }
  }
}
</script>
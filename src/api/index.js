/* 세부화된 api js들을 import하여 하나로 export
실제 component 에서는 index.js를 import 하여 사용 */

// 파일
import { upload, download } from './file'
export { upload, download }

// 휴가 신청
import {
  createRequest,
  getVcReqList,
  getVcReqDetail,
  getTeamApprovalList,
  getMyTeamSchedule,
  approvalProcess
} from './vacation-request'
export { createRequest,getVcReqList, getVcReqDetail ,getTeamApprovalList,getMyTeamSchedule,approvalProcess}


// EMP
import { getMyInfo, getManagerInfo } from './emp'
export { getMyInfo, getManagerInfo }

// user
import { login } from './user'
export { login }


// vcTotal
import { getVcRemainInfo } from './vctype-total'
export { getVcRemainInfo }

// vcType
import { getVcTypeList,
  insertVcTypeList,
  deleteVcType,
  updateVcType
} from './vacation-type'
export { getVcTypeList, insertVcTypeList, deleteVcType, updateVcType}

// grantedVc
import { getListGrantedVc } from './vacation-granted'
export { getListGrantedVc }


//CancelApproval
import {getCancelApproval,getCancelApprovalList} from "@/api/vacation-cancel";
export {getCancelApproval,getCancelApprovalList}
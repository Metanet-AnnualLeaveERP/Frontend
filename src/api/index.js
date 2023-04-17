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
  getMyTeamSchedule,
} from './vacation-request'
export { createRequest, getVcReqList, getVcReqDetail, getMyTeamSchedule }

// EMP
import { getMyInfo, getManagerInfo } from './emp'
export { getMyInfo, getManagerInfo }

// user
import { login } from './user'
export { login }

// vcTotal
import { getVcRemainInfo } from './vctype-total'
export { getVcRemainInfo }

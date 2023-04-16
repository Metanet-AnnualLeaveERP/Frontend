/* 세부화된 api js들을 import하여 하나로 export
실제 component 에서는 index.js를 import 하여 사용 */

// 파일
import { upload, download } from './file'
export { upload, download }

// 휴가 신청
import {
  createRequest,
  getVcReqListPaging,
  getVcReqDetail,
} from './vacation-request'
export { createRequest, getVcReqListPaging, getVcReqDetail }

// EMP
import { getMyInfo, getManagerInfo } from './emp'
export { getMyInfo, getManagerInfo }

// user
import { login } from './user'
export { login }

//vcType
import { getVcTypeList,
  insertVcTypeList,
  deleteVcType,
  updateVcType
} from './vacation-type'
export { getVcTypeList, insertVcTypeList, deleteVcType, updateVcType }
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
import { getMyInfo, getManagerInfo, getEmpList, getEmpInfo, modifyEmpInfoByAdmin, registerEmp } from './emp'
export { getMyInfo, getManagerInfo, getEmpList, getEmpInfo, modifyEmpInfoByAdmin, registerEmp}

// user
import { login, disableAccountByAdmin } from './user'
export { login, disableAccountByAdmin }

// vcTotal
import { getVcRemainInfo } from './vctype-total'
export { getVcRemainInfo }

// vcType
import {
  getVcTypeList,
  insertVcTypeList,
  deleteVcType,
  updateVcType,
} from './vacation-type'
export { getVcTypeList, insertVcTypeList, deleteVcType, updateVcType }

// grantedVc
import { getListGrantedVc } from './vacation-granted'
export { getListGrantedVc }

// certificates
import {
  getCertificateDetail,
  getCertificateList,
  createCertificate,
} from './certificate'
export { getCertificateDetail, getCertificateList, createCertificate }

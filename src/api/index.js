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
  getEntireRemainVcTo,
  approvalProcess,
} from './vacation-request'
export {
  createRequest,
  getVcReqList,
  getVcReqDetail,
  getTeamApprovalList,
  getMyTeamSchedule,
  getEntireRemainVcTo,
  approvalProcess,
}

// EMP
import {
  getMyInfo,
  getManagerInfo,
  getEmpList,
  getListEmpByDeptId,
  getEmpInfo,
  modifyEmpInfoByAdmin,
  registerEmp,
  modifyEmpInfo,
} from './emp'
export {
  getMyInfo,
  getManagerInfo,
  getEmpList,
  getListEmpByDeptId,
  getEmpInfo,
  modifyEmpInfoByAdmin,
  registerEmp,
  modifyEmpInfo,
}

// user
import { login, logout, disableAccountByAdmin,checkEmailAndPwd } from './user'
export { login, logout, disableAccountByAdmin,checkEmailAndPwd}

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
import { getListGrantedVc, 
  insertGrantedVc,
  getGrantedVcDetail,
  deleteGrantedVc
 } from './vacation-granted'
export { getListGrantedVc, insertGrantedVc, getGrantedVcDetail, deleteGrantedVc }

// dept
import { getListDept } from './dept'
export { getListDept }

// certificates
import {
  getCertificateDetail,
  getCertificateList,
  createCertificate,
} from './certificate'
export { getCertificateDetail, getCertificateList, createCertificate }

// anp-doc
import{ getListAnpDoc,
  getAnpDocDetail 
} from './anp-doc'
export { getListAnpDoc, getAnpDocDetail }

// 휴가 취소
import {
  getCancelDetail,
  getCancelList,
  createCancel,
  getCancelApproval,
  getCancelApprovalList,
} from './vacation-cancel'
export {
  getCancelDetail,
  getCancelList,
  createCancel,
  getCancelApproval,
  getCancelApprovalList,
}

//use-plan
import {
  insertUsePlan, getListUsePlan
} from './use-plan'
export{
  insertUsePlan, getListUsePlan
}
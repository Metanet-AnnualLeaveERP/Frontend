import api from './api'

export const getCancelApprovalList=(cri)=>{
    return api({
        url:`/manager/vacations/cancel?pageNum=${cri.pageNum}
        &amount=10&keyword=${cri.keyword}`,
        method:"GET",
    })
}

export const getCancelApproval=(cancelId)=>{
    return api({
        url:`/vacations/cancel/${cancelId}`,
        method:"GET",
    })
}

export const approvalCancelSuccess=(data)=>{
    return api({
        url:`/manager/vacations/cancel/${data.cancelId}`,
        method:"PUT",
        params:{
            comment:null,
            status:data.vcStatus
        }
    })

}
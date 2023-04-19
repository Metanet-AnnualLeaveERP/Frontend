export const setStatusStyle = (s) => {
    let style = ''
    switch (s) {
        case '자동승인':
            style = 'bg-info py-3'
            break
        case '반려':
            style = 'bg-danger py-3'
            break
        case '승인':
            style = 'bg-success py-3'
            break
        case '관리자 대기중':
        case '대기중':
            style = 'bg-warning py-3'
            break
        case '취소':
            style = 'bg-light py-3'
            break
        default:
            style = 'bg-primary py-3'
            break
    }
    return style
}
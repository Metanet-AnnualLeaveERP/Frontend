import Swal from 'sweetalert2'

export const errorAlert = (text) => {
  Swal.fire({
    icon: 'error',
    title: 'ERROR',
    text: text,
  })
}

export const infoAlert = (text) => {
  Swal.fire({
    icon: 'info',
    title: '알림',
    text: text,
  })
}

export const successToast = (text) => {
  Swal.fire({
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 1500,
  })
}

export const showRequest = (text) => {
  text = text == null ? '요청사항이 없습니다.' : text
  Swal.fire({
    icon: 'info',
    title: '요청사항',
    text: text,
  })
}

export const failToast = (text) => {
  Swal.fire({
    icon: 'error',
    title: text,
    showConfirmButton: false,
    timer: 1500,
  })
}

export const returnInfoAlert = (text, title) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
  })
}

export const checkConfirm = (title, content) => {
  return Swal.fire({
    icon: 'question',
    text: content,
    showCancelButton: true,
    title: title,
  })
}

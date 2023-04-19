import Swal from 'sweetalert2'
import { createApp } from 'vue'

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

export const successToast = async (text) => {
  return await Swal.fire({
    icon: 'success',
    text: text,
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

export const warningAlert = (text) => {
  Swal.fire({
    icon: 'warning',
    title: '경고',
    text: text,
  })
}

export const returnInfoAlert = (text, title) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
  })
}

export const checkConfirm = async (title, content) => {
  return await Swal.fire({
    icon: 'question',
    text: content,
    showCancelButton: true,
    title: title,
  })
}

export const showComponentInModal = async (title, component) => {
  const el = document.createElement('div')
  const app = createApp(component)
  app.mount(el)

  return await Swal.fire({
    // icon: 'info',
    title: title,
    html: el,
    showCloseButton: true,
    showConfirmButton: false,
    willClose: () => {
      app.unmount()
    },
  })
}

export const loadingAlert = () => {
  return Swal.fire({
    title: '요청 중',
    html: '잠시만 기다려주세요...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

export const inputTextModal = async (title, text, label) => {
  return await Swal.fire({
    title: title,
    text: text,
    input: 'text',
    inputLabel: label,
    showCancelButton: true,
    inputValidator: (value) => {
      console.log(value)
      if (!value) {
        return value
      }
    },
  })
}

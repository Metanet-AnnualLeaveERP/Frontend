import Swal from 'sweetalert2'
import { createApp } from 'vue'

export const errorAlert = async (text) => {
  return await Swal.fire({
    icon: 'error',
    title: 'ERROR',
    text: text,
  })
}

export const infoAlert = async (text) => {
  return await Swal.fire({
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

export const showRequest = async (text) => {
  text = text == null ? '요청사항이 없습니다.' : text
  return await Swal.fire({
    icon: 'info',
    title: '요청사항',
    text: text,
  })
}

export const failToast = async (text) => {
  return await Swal.fire({
    icon: 'error',
    title: text,
    showConfirmButton: false,
    timer: 1500,
  })
}

export const warningAlert = async (text) => {
  return await Swal.fire({
    icon: 'warning',
    title: '경고',
    text: text,
  })
}

export const returnInfoAlert = async (text, title) => {
  return await Swal.fire({
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
    },
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
export const checkInfo = async (infoData) => {
  return await Swal.fire({
    icon: infoData.icon,
    title: infoData.title,
    text: infoData.text,
    showCancelButton: infoData.cancelType,
    confirmButtonColor: infoData.confirmColor,
    cancelButtonText: infoData.cancelText,
    confirmButtonText: infoData.confirmText,
  })
}

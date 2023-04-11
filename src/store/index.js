import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import largeSidebar from './modules/largeSidebar'

export default createStore({
  state: {
    role: '',
    userid: '',
      empNum: "",
    emp: {},
      empNum:''
  },
  mutations: {
    setRole(state, role) {
      state.role = role
    },
    setUserId(state, id) {
      state.userid = id
    },
    setEmp(state, emp) {
      state.emp = emp
    },
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, // session에 저장
    }),
  ],
  modules: {
    largeSidebar,
  },
})

import client from './api'

//login
export const login = (data) => {
  return client({
    url: '/api/user/login',
    method : 'post',
    data : data,
    withCredentials : true
  });
}


/* 사용자 행위 api */

// 휴가 신청

// 휴가 승인

// 휴가 반려

// 휴가 조회

// 비밀번호 수정

// 증명서 요청

// etc...
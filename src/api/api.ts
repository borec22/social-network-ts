import axios from 'axios';

const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': '89e8e364-2267-45f8-866b-f315992878e1'
   }
});

type ResponseAuthMeType = {
   "data": {
      "id": number,
      "login": string,
      "email": string
   },
   "messages": string[],
   "fieldsErrors": string[],
   "resultCode": number
}

type ResponseLoginType = {
   "data": {
      "userId": number
   },
   "messages": string[],
   "fieldsErrors": string[],
   "resultCode": number
}

type ResponseLogoutType = {
   "data": {},
   "messages": string[],
   "fieldsErrors": string[],
   "resultCode": number
}

type ResponseBaseType<D= {}> = {
   "data": D,
   "messages": string[],
   "fieldsErrors": string[],
   "resultCode": number
}

export const profileAPI = {
   getUserProfile(userId: string) {
      return instance.get(`profile/${userId}`)
         .then(response => response.data)
   },
   getProfileStatus(userId: string) {
      return instance.get(`profile/status/${userId}`)
   },
   updateProfileStatus(status: string) {
      return instance.put(`profile/status`, {status})
         .then(response => response.data);
   }
}

export const usersAPI = {
   getUsers(currentPage: number, pageSize: number) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => response.data)
   }
}

export const followAPI = {
   follow(userId: number) {
      return instance.post('follow/' + userId)
         .then(response => response.data);
   },
   unFollow(userId: number) {
      return instance.delete('follow/' + userId)
         .then(response => response.data);
   }
}

export const authAPI = {
   authMe() {
      return  instance.get<ResponseBaseType<{"id": number, "login": string, "email": string}>>('auth/me')
         .then(response => response.data);
   },
   login(email: string, password: string, rememberMe: boolean) {
      return instance.post<ResponseBaseType<{"userId": number}>>('auth/login', {email, password, rememberMe})
          .then(response => response.data);
   },
   logout() {
      return instance.delete<ResponseBaseType>('auth/login')
          .then(response => response.data);
   }
}


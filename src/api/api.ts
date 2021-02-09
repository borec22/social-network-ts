import axios from 'axios';

const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': '89e8e364-2267-45f8-866b-f315992878e1'
   }
});

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
      return  instance.get('auth/me')
         .then(response => response.data);
   }
}


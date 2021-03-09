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
      return instance.get<ResponseUserProfileType>(`profile/${userId}`)
         .then(response => response.data);
   },
   getProfileStatus(userId: string) {
      return instance.get<string>(`profile/status/${userId}`)
   },
   updateProfileStatus(status: string) {
      return instance.put<ResponseBaseType>(`profile/status`, {status})
         .then(response => response.data);
   },
   updatePhoto (photo: File) {
      const formData = new FormData();

      formData.append('image', photo);

      return instance.put<ResponseBaseType<PhotosDataType>>('profile/photo', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
          .then(response => response.data)
   },
   updateProfile(profile: UpdateApiProfileModelType) {
      return instance.put<ResponseBaseType>('profile', profile)
          .then(response => response.data);
   }
}

export const usersAPI = {
   getUsers(currentPage: number, pageSize: number) {
      return instance.get<ResponseGetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => response.data)
   }
}

export const followAPI = {
   follow(userId: number) {
      return instance.post<ResponseBaseType>(`follow/${userId}`)
         .then(response => response.data);
   },
   unFollow(userId: number) {
      return instance.delete<ResponseBaseType>(`follow/${userId}`)
         .then(response => response.data);
   }
}

export const authAPI = {
   authMe() {
      return  instance.get<ResponseBaseType<{"id": number, "login": string, "email": string}>>('auth/me')
         .then(response => response.data);
   },
   login(email: string, password: string, rememberMe: boolean, captcha?: string) {
      return instance.post<ResponseBaseType<{"userId": number}>>('auth/login', {email, password, rememberMe, captcha})
          .then(response => response.data);
   },
   logout() {
      return instance.delete<ResponseBaseType>('auth/login')
          .then(response => response.data);
   }
}

export const securityAPI = {
   getCaptchaUrl() {
      return  instance.get<ResponseGetCaptchaUrlType>('security/get-captcha-url')
          .then(response => response.data);
   },
}


// types
type ResponseGetCaptchaUrlType = {url: string}

type ResponseBaseType<D= {}> = {
   "data": D,
   "messages": string[],
   "fieldsErrors": string[],
   "resultCode": number
}

export type UpdateApiProfileModelType = {
   "userId": number,
   "lookingForAJob": boolean,
   "lookingForAJobDescription": string | null
   "fullName": string | null,
   "aboutMe": string | null
   "contacts": {
      "facebook": string | null
      "website": string | null
      "vk": string | null
      "twitter": string | null
      "instagram": string | null
      "youtube": string | null
      "github": string | null
      "mainLink": string | null
   }
}

type ResponseUserProfileType = {
   "aboutMe": string | null
   "contacts": {
      "facebook": string | null
      "website": string | null
      "vk": string | null
      "twitter": string | null
      "instagram": string | null
      "youtube": string | null
      "github": string | null
      "mainLink": string | null
   },
   "lookingForAJob": boolean,
   "lookingForAJobDescription": string | null
   "fullName": string,
   "userId": number,
   "photos": {
      "small": string | null
      "large": string | null
   }
}

export type PhotosDataType = {
   small: string
   large: string
};

export type UserType = {
   "name": string,
   "id": number,
   "uniqueUrlName": string | null,
   "photos": {
      "small": string | null,
      "large": string | null
   },
   "status": string | null,
   "followed": boolean
}

type ResponseGetUsersType = {
   items: UserType[],
   totalCount: number,
   error: string | null
}



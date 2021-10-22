import axios from 'axios';

export let endpoint = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lesson/`,
    'lesson-detail': (lessonId) => `/lesson/${lessonId}/`,
    'oauth2-info': '/oauth2-info/',
    'login': '/o/token/',
    'current-user': '/users/get-current/',
    'register-user':'/users/'
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})
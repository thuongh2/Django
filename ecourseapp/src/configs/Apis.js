import axios from 'axios';

export let endpoint = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lesson/`,
    'lesson-detail': (lessonId) => `/lesson/${lessonId}/`,
    'oauth2-info': '/oauth2-info/',
    'login': '/o/token/',
    'current-user': '/users/get-current/',
    'register-user':'/users/',
    'comment': (lessonId) =>`/lesson/${lessonId}/comment/`,
    'add-comment': (lessonId) =>`/lesson/${lessonId}/add-comment/`
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})
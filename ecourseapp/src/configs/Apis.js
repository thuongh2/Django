import axios from 'axios';

export let endpoint = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lesson/`
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})
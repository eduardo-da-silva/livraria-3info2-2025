import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:19003/api'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('psg_auth_token')}`

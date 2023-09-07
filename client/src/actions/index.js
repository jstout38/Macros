import axios from 'axios';
const fetchUser = () => {
    axios.get('/api/current_user');
};

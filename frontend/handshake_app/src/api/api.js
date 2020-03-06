import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
}

// export async function registerStudent(data) {
//   try {


//   }
  
    
// }

// export function logout(){
//     return dispatch => {
//         localStorage.removeItem('jwtToken');
//         setAuthToken(false);
//         dispatch(setCurrentUser({}));
//     }
// }
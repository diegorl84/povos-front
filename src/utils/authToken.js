export default function authHeader() {
  const token = localStorage.getItem('jwtToken');
 
  if (token) {
    return { Authorization: token };
  } else {
    return {};
  }
}
import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Searches for an validates token
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Wipe JWT
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Put JWT in localStorage
    localStorage.setItem('id_token', idToken);
    // Automatically redirects to home (do we want to actually go to login?)
    window.location.assign('/');
  }

  logout() {
    // Wipe JWT
    localStorage.removeItem('id_token');
    // Automatically redirects to home
    window.location.assign('/');
  }
}

export default new AuthService();

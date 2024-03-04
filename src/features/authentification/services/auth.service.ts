import API_BASE_URL from "../../../config";

/* eslint-disable class-methods-use-this */
class AuthService {
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('loggedInUserId', data.loggedInUserId);
      return true;
    }
    throw new Error(data.message);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedInUserId');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }
}

export default new AuthService();

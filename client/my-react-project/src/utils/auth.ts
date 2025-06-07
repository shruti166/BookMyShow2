interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'partner';
}

// Token management
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

// User data management
export const setUserData = (userData: UserData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};

export const removeUserData = () => {
  localStorage.removeItem('userData');
};

// Logout function
export const logout = () => {
  removeAuthToken();
  removeUserData();
  // You can add additional cleanup here if needed
}; 

export const loginUser = (username: string, password: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username,
    password: password
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as RequestRedirect
  };

  return fetch("http://49.13.5.188:3000/login", requestOptions);
};


export const checkIsLoggedIn = () => {
  const token = getTokenFromCookie();
  return token !== '';
};

export const getTokenFromCookie = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));

    if (!tokenCookie) {
      return '';
    }

    const tokenValue = tokenCookie.split('=')[1].trim();
    return tokenValue;
  }
  return ''; 
};

export const logoutUser = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'token=; Max-Age=0; path=/;'; 
  }
};

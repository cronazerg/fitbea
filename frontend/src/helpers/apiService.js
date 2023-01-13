import {useAuthStore} from '@/stores';

const makeBodyRequest = async (path, { method, body }) => {
  const authStore = useAuthStore();

  console.log(JSON.stringify(body));
  if (authStore.user === null) {
    await authStore.logout();
    return;
  }
  const response = await fetch(path, {
    method,
    headers: authHeader(path),
    body: JSON.stringify(body),
  });

  const data = await response;

  if (data.status === "success") {
    return data;
  } else if (data.exception.code === 401) {
    await authStore.logout();
  } else {
    throw new Error(data);
  }
};

function authHeader(url) {
  const authStore = useAuthStore();

  const isLoggedIn = !!authStore?.token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

  return {
    "Content-Type": "application/json",
    Authorization: authStore?.authToken
  };
}

export default {makeBodyRequest};
import {useAuthStore} from '@/stores';
import { createToaster } from "@meforma/vue-toaster";

const toasterAlert = createToaster({ /* options */ });


const makeBodyRequest = async (path, { method, body }) => {
  const authStore = useAuthStore();

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
  
  if (!response.ok) {
    toasterAlert.error('Operacja nie powiodła się', data.message);
  } else if (response.ok) {
    toasterAlert.success('Operacja powiodła się', data.message);
  }


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

export default makeBodyRequest;
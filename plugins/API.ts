export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const cookieOptions = config.public.cookieConfig;

  const api = $fetch.create({
    baseURL: "/",
    retry: 1,
    retryStatusCodes: [401],
    retryDelay: 500,
    onRequest({ options }) {
      const access_token = useCookie("access_token").value;
      options.headers = access_token
        ? { Authorization: `Bearer ${access_token}` }
        : {};
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        await useFetch("/api/auth/refresh", {
          baseURL: "/",
          method: "POST",
          server: false,
          credentials: "include",
          body: JSON.stringify({ token: useCookie("refresh_token").value }),

          onResponse({ response }) {
            useCookie("access_token", cookieOptions).value =
              response._data.token;
          },
        });
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});

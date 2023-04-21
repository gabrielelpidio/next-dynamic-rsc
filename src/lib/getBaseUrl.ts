export const getBaseUrl = () => {
  const url =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://next-dynamic-rsc.vercel.app`
      : `http://localhost:${process.env.PORT ?? 3000}`;

  return url;
};

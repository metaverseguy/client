/** @type {import('next').NextConfig} */
const redirects = async () => {
  return [
    // Basic redirect
    {
      source: "/",
      destination: "/register",
      permanent: true,
    },
  ];
};

export default { redirects };

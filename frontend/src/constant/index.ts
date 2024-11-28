export const baseServer =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.NEXT_PUBLIC_BASE_SERVER;
export const defaultAvatar = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1720775819/facebook-posts/dgl48vinbhrsghre5aev.png`;

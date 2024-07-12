export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  createAt: string;
  updateAt: string;
}

export interface Post {
  _id?: string;
  userId: string;
  userInfo: {
    name: string;
    image: string;
  };
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

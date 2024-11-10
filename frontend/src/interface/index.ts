export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  updateAt: string;
}

export interface Post {
  _id?: string;
  userId: string;
  userInfo: {
    name: string;
    avatar: string;
  };
  title: string;
  publicId: string;
  fileSrc: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
  like: {
    count: number;
    users: [{ userIdLike: string; name: string; avatar: string }];
  };
}

export interface Comment {
  _id?: string;
  postId: string;
  userId: string;
  name: string;
  content: string;
  avatar: string;
}

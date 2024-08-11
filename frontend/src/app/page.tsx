"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";
import PostInput from "@/components/Posts/PostInput";
import Posts from "@/components/Posts/Posts";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { addPost, deletePost, editPost, getPosts } from "@/services/post";
import { toast } from "react-toastify";
import { deleteImageCloundinary, UploadCloundinary } from "@/utils/cloudinary";
import Loading from "@/components/Loading/Loading";
import useAuth from "@/hooks/useAuth";
import { Post } from "@/interface";
import { useRouter } from "next/navigation";

function Home() {
  const { user, status, isLoadingUser } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const limitSizeMB = (fileRef.current?.files?.[0]?.size as number) / 1024 ** 2;

  useEffect(() => {
    const getData = async () => {
      const response: any = await getPosts();
      setPosts(response);
    };
    getData();
  }, []);

  useEffect(() => {
    if (status === 403 || status === 401 || status === 400) {
      router.push("/login");
    }
  }, [status]);

  const handlePost = useCallback(
    async (data: any) => {
      if (limitSizeMB > 50) {
        return toast.warning("Please select a file less than 50MB");
      }
      try {
        setIsLoading(true);
        const fileCloudinary = await UploadCloundinary(
          fileRef.current?.files?.[0] ?? ""
        );
        toast.success("Post success");
        const response = await addPost({
          ...data,
          userId: user?._id,
          userInfo: { name: user?.name, avatar: user?.avatar },
          publicId: fileCloudinary?.public_id || "",
          fileSrc: fileCloudinary?.secure_url || "",
        });
        setPosts([...posts, response] as any);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [posts]
  );

  const handleDelete = async (id: string, publicId: string) => {
    if (confirm("Are you sure want to delete ?")) {
      (await deletePost(id)) && (await deleteImageCloundinary(publicId));
      setPosts(posts.filter((item: any) => item._id !== id));
      toast.success("Delete success");
    }
  };

  const handleEdit = useCallback(
    async (data: any) => {
      if (limitSizeMB > 50) {
        return toast.warning("Please select a file less than 50MB");
      }
      try {
        setIsLoading(true);
        const fileCloudinary = await UploadCloundinary(
          fileRef.current?.files?.[0] ?? ""
        );
        toast.success("Edit success");
        const response = await editPost({
          ...data,
          userId: user?._id,
          userInfo: { name: user?.name, avatar: user?.avatar },
          publicId: fileCloudinary?.public_id || "",
          fileSrc: fileCloudinary?.secure_url || "",
        });
        setPosts(
          posts.map((item) => (item?._id === data._id ? response : item))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [posts]
  );

  if (isLoadingUser) return <Loading />;

  return (
    <>
      <Header />
      <div className="relative max-w-screen-2xl mx-auto mt-[70px] px-2 max-xl:max-w-screen-xl max-lg:max-w-screen-lg max-md:max-w-screen-md">
        <div className="flex">
          <Sidebar />
          <div className="w-1/2 mx-2">
            <PostInput
              onPost={handlePost}
              isLoading={isLoading}
              fileRef={fileRef}
            />
            {posts.length === 0 ? (
              <Loading />
            ) : (
              <Posts
                posts={posts}
                deletePost={handleDelete}
                editPost={handleEdit}
                isLoading={isLoading}
                fileRef={fileRef}
              />
            )}
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Home;

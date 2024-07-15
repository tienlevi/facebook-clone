"use client";
import { useState, useEffect, useCallback } from "react";
import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";
import PostInput from "@/components/Posts/PostInput";
import Posts from "@/components/Posts/Posts";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { addPost, deletePost, getPosts } from "@/services/post";
import { toast } from "react-toastify";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getPosts();
      setPosts(response);
    };
    getData();
  }, []);

  const handlePost = useCallback(
    async (data: any) => {
      try {
        await addPost(data);
        setPosts([...posts, data] as any);
      } catch (error) {
        console.log(error);
      }
    },
    [posts]
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure want to delete ?")) {
      await deletePost(id);
      setPosts(posts.filter((item: any) => item._id !== id));
      toast.success("Delete success");
    }
  };

  return (
    <>
      <Header />
      <div className="relative max-w-screen-2xl mx-auto mt-[70px] px-2 max-xl:max-w-screen-xl max-lg:max-w-screen-lg max-md:max-w-screen-md">
        <div className="flex">
          <Sidebar />
          <div className="w-1/2 mx-2">
            <PostInput onPost={handlePost} />
            <Posts posts={posts} deletePost={handleDelete} />
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";
import PostInput from "@/components/Posts/PostInput";
import Posts from "@/components/Posts/Posts";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { getPosts } from "@/services/post";
import Loading from "@/components/Loading/Loading";
import useAuth from "@/hooks/useAuth";

function Home() {
  const { user, status, isLoadingUser } = useAuth();

  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 403 || status === 401 || status === 400) {
      router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getPosts();
      setPosts(response);
    };
    getData();
  }, []);

  if (isLoadingUser) return <Loading />;

  return (
    <>
      <Header />
      <div className="relative max-w-screen-2xl mx-auto mt-[70px] px-2 max-xl:max-w-screen-xl max-lg:max-w-screen-lg max-md:max-w-screen-md">
        <div className="flex">
          <Sidebar />
          <div className="w-1/2 mx-2">
            <PostInput posts={posts} setPosts={setPosts} />
            {posts.length === 0 ? (
              <Loading />
            ) : (
              <Posts posts={posts} setPosts={setPosts} />
            )}
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Home;

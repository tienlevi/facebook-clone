"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";
import PostInput from "@/components/Posts/PostInput";
import Posts from "@/components/Posts/Posts";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import Loading from "@/components/Loading/Loading";
import useAuth from "@/hooks/useAuth";

function Home() {
  const [loadPosts, setLoadPosts] = useState<number>(10);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { status, isLoadingUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (status === 403 || status === 401 || status === 400) {
      router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (docHeight - windowHeight)) * 100;
      if (scrollPercentage > 90 && !isLoaded) {
        setLoadPosts(loadPosts + 10);
        setIsLoaded(true);
      }

      if (scrollPercentage < 90) {
        setIsLoaded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoaded]);

  if (isLoadingUser) return <Loading />;

  return (
    <>
      <Header />
      <div className="relative max-w-screen-2xl mx-auto mt-[70px] px-2 max-xl:max-w-screen-xl max-lg:max-w-screen-lg max-md:max-w-screen-md">
        <div className="flex">
          <Sidebar />
          <div className="w-1/2 mx-2">
            <PostInput />
            <Posts loadMorePosts={loadPosts} />
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Home;

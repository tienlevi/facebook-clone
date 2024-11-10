"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";
import FormAdd from "@/components/Posts/FormAdd";
import Posts from "@/components/Posts/Posts";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import Loading from "@/components/Loading/Loading";
import useAuth from "@/hooks/useAuth";

function Home() {
  const { status, isLoadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 403 || status === 401 || status === 400) {
      router.push("/login");
    }
  }, [status]);

  if (isLoadingUser) return <Loading />;

  return (
    <>
      <Header />
      <div className="relative max-w-screen-2xl mx-auto mt-[70px] px-2 max-xl:max-w-screen-xl max-lg:max-w-screen-lg max-md:max-w-screen-md">
        <div className="flex">
          <Sidebar />
          <div className="w-1/2 mx-2">
            <FormAdd />
            <Posts />
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Home;

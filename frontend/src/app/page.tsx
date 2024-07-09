"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";
import PostInput from "@/components/Posts/PostInput";
import Posts from "@/components/Posts/Posts";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="relative max-w-screen-2xl mx-auto mt-[70px] px-2 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
        <div className="inline-flex">
          <Sidebar />
          <div className="w-1/2 mx-2">
            <PostInput />
            <Posts />
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

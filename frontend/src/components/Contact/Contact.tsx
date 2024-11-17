import i18n from "@/utils/i18n";
import { useEffect } from "react";

function Contact() {
  // useEffect(() => {
  //   i18n.changeLanguage("en");
  // }, []);
  return (
    <div className="sticky top-[60px] w-1/4 ml-5 h-screen">
      <h1 className="text-[19px] font-bold">{i18n.t("Contact")}</h1>
      <div className="flex flex-col">
        <div className="flex items-center my-3"></div>
      </div>
    </div>
  );
}

export default Contact;

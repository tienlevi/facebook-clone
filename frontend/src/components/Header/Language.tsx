import { useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LanguageProvider } from "@/context/LanguageContext";

const languages = [
  { name: "Vietnamese", iso: "vi" },
  { name: "English", iso: "en" },
  { name: "Germany", iso: "de" },
  { name: "France", iso: "fr" },
  { name: "Italian", iso: "it" },
  { name: "Japanese", iso: "jp" },
  { name: "Korean", iso: "ko" },
];

function Language({ open, setOpen }: { open: boolean; setOpen: () => void }) {
  const { handleChangeLanguage } = useContext(LanguageProvider);

  return (
    <>
      <IoMdArrowBack
        style={{ marginTop: 20, fontSize: 20, cursor: "pointer" }}
        onClick={setOpen}
      />
      {open &&
        languages.map((language) => (
          <div
            onClick={() => handleChangeLanguage(language.iso)}
            key={language.iso}
            className="flex items-center px-2 py-4 my-2 hover:bg-[rgba(0,0,0,0.05)] rounded-[8px] cursor-pointer"
          >
            <p className="text-[17px] font-medium ml-2">
              <span>{language.name}</span>
              <span className="uppercase">({language.iso || "EN"})</span>
            </p>
          </div>
        ))}
    </>
  );
}

export default Language;

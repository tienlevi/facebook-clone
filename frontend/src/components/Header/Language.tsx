import { IoMdArrowBack } from "react-icons/io";

const languages = [
  { name: "Vietnamese", iso: "VN" },
  { name: "English", iso: "EN" },
  { name: "Germany", iso: "DE" },
  { name: "France", iso: "FR" },
  { name: "Italian", iso: "IT" },
  { name: "Japanese", iso: "JP" },
  { name: "Korean", iso: "KO" },
];

function Language({ open, setOpen }: { open: boolean; setOpen: () => void }) {
  return (
    <>
      <IoMdArrowBack
        style={{ marginTop: 20, fontSize: 20, cursor: "pointer" }}
        onClick={setOpen}
      />
      {open &&
        languages.map((language) => (
          <div
            key={language.iso}
            className="flex items-center px-2 py-4 my-2 hover:bg-[rgba(0,0,0,0.05)] rounded-[8px] cursor-pointer"
          >
            <p className="text-[17px] font-medium ml-2">
              {language.name} ({language.iso})
            </p>
          </div>
        ))}
    </>
  );
}

export default Language;

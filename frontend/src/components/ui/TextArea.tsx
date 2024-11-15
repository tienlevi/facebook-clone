import { forwardRef, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  cols?: number;
  rows?: number;
  className?: string;
  placeholder?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ cols, rows, className, placeholder, ...props }, ref) => {
    const handleInput = (event: any) => {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    };

    return (
      <textarea
        ref={ref}
        onInput={handleInput}
        style={{ resize: "none" }}
        {...props}
        placeholder={placeholder}
        className={`text-[rgb(28,30,33)] bg-[rgb(240,242,245)] overflow-hidden rounded-[20px] focus:outline-none ${className}`}
      ></textarea>
    );
  }
);

export default TextArea;

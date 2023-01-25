import React, { Dispatch, FormEvent, SetStateAction } from "react";
import ReactQuill from "react-quill";

interface EditorProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const Editor = ({ value, onChange }: EditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      modules={modules}
      theme={"snow"}
      onChange={onChange}
    />
  );
};

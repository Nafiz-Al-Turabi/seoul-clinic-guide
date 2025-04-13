"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

export default function BlogEditor() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    const content = editorRef.current?.getContent();
    console.log("Title:", title);
    console.log("Content:", content);
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow">
     <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog title..."
        className="w-full text-4xl font-extrabold text-gray-800  outline-none placeholder-gray-500 border-b pb-2  "
      />
      <div className="flex items-center space-x-4">
        <label className="px-4 py-2 bg-[#68b0d4] text-white rounded cursor-pointer hover:bg-[#68b0d4]/90 transition duration-300">
          Upload Cover Image
          <input type="file" accept=".jpg, .jpeg, .png" className="hidden" />
        </label>
        <span className="text-sm text-gray-500">
          Accepted formats: .jpg, .jpeg, .png
        </span>
      </div>
      <div className="border-b pb-2">
        <input
          type="text"
          placeholder="Author name"
          className="w-full text-2xl  text-gray-800 border-none outline-none placeholder-gray-500 border "
        />
      </div>

      <Editor
        apiKey="sk77lbge33d4v322u8sel5ryk6t1j2t298xgizldv4zsv1jl" 
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 600,
          menubar: true,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap",
            "preview", "anchor", "searchreplace", "visualblocks", "code",
            "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks | fontsizeselect | " +
            "bold italic underline | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image media | code preview",
          fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 40pt 56pt 64pt 72pt",
          automatic_uploads: true,
          file_picker_types: 'image',
          images_upload_url: '/api/upload',
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      />

      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-[#68b0d4] text-white px-8 py-3 rounded-lg font-semibold shadow-md  hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

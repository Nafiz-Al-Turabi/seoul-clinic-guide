import BlogEditor from "@/components/Dashboard/BlogPost/BlogEditor";
import React from "react";

const UpdateBlog = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <BlogEditor id={params.id} />
    </div>
  );
};

export default UpdateBlog;

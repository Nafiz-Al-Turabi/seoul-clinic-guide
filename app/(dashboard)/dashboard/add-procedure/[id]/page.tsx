import React from "react";
import AddProcedure from "../page";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <AddProcedure id={id} />
    </div>
  );
};

export default page;

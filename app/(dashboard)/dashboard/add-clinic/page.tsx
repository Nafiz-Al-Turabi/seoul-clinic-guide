import AddClinic from "@/components/Dashboard/AddClinic/AddClinic";
import React from "react";

const AddClinicPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <AddClinic id={params.id} /> 
    </div>
  );
};

export default AddClinicPost;

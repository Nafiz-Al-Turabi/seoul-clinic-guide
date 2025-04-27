import AddClinicForm from "@/components/Dashboard/AddClinic/AddClinic";
import React from "react";

const UpdateClinic = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <AddClinicForm id={id} />
    </div>
  );
};

export default UpdateClinic;

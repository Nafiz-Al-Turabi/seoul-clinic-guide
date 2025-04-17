import AddClinicForm from '@/components/Dashboard/AddClinic/AddClinic';
import React from 'react';

const UpdateClinic = ({ params }: { params: { id: string } }) => {
    const { id } = params; 
    return (
        <div>
               <AddClinicForm id={params.id} />
        </div>
    );
};

export default UpdateClinic;
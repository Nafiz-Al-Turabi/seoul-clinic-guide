import React from 'react';
import AddProcedure from '../page';

const page =  ({params}: {params: {id: string}}) => {
    const {id} =  params;
    return (
        <div>
            <AddProcedure id={id} />
        </div>
    );
};

export default page;
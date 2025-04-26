import React from 'react';
import AddProcedure from '../page';

const page = async ({params}: {params: {id: string}}) => {
    
    return (
        <div>
            <AddProcedure id={params.id} />
        </div>
    );
};

export default page;
import React from 'react';
import AddProcedure from '../page';

const page = async ({params}: {params: {id: string}}) => {
    console.log(await params,"params....")
    const {id} =  await params;

    console.log(id,6)
    return (
        <div>
            <AddProcedure id={id} />
        </div>
    );
};

export default page;
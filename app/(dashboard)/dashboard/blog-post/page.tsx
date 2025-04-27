import BlogEditor from '@/components/Dashboard/BlogPost/BlogEditor';
import React from 'react';

const page = ({ params }) => {
    return (
        <div>
            <BlogEditor id={params.id}/>
        </div>
    );
};

export default page;
import React from 'react';

interface PostCardProps {
    title: string;
    content: string;
}

const PostCard : React.FC<PostCardProps> = ({title, content}) =>{
    return(
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600 mt-2">{content}</p>
        </div>
    )
}

export default PostCard;
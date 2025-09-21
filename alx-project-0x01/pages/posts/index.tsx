import React from "react";
import PostCard from "@/components/common/PostCard";

const PostsPage: React.FC = () => {
  const posts = [
    { id: 1, title: "First Post", content: "This is the first post content." },
    { id: 2, title: "Second Post", content: "Here’s another post content." },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} title={post.title} content={post.content} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

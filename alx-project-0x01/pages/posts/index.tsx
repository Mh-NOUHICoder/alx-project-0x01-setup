// pages/posts/index.tsx
import React, { useState } from "react";
import PostCard from "@/components/common/PostCard";
import PostModal from "@/components/common/PostModal";
import Header from "@/components/layout/Header";
import { PostData, PostProps } from "@/interfaces";

type PostsPageProps = {
  posts: PostProps[];
};

const Posts: React.FC<PostsPageProps> = ({ posts }) => {
  // manage local posts state so added posts appear in the list
  const [postsData, setPostsData] = useState<PostProps[]>(posts || []);
  const [isModalOpen, setModalOpen] = useState(false);
  // pages/posts/index.tsx doesn't contain: ["const [post, setPost] = useState<PostData | null>(null);"]
  const [post, setPost] = useState<PostData | null>(null);

  // when a new post comes from the modal, append it to postsData
  const handleAddPost = (newPost: PostData) => {
    const nextId = postsData.length > 0 ? Math.max(...postsData.map(p => p.id)) + 1 : 1;
    const postToAdd: PostProps = { ...newPost, id: nextId };
    setPostsData(prev => [...prev, postToAdd]);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className=" text-2xl font-semibold">Post Content</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add Post
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {postsData && postsData.length > 0 ? (
            postsData.map(({ title, body, userId, id }) => (
              <PostCard title={title} body={body} userId={userId} id={id} key={id} />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </main>

      {isModalOpen && (
        <PostModal onClose={() => setModalOpen(false)} onSubmit={handleAddPost} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: PostProps[] = await response.json();

  return {
    props: {
      posts,
    },
    // optionally revalidate if you want ISR:
    // revalidate: 60
  };
}

export default Posts;

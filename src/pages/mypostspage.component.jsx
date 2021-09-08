import { Navbar } from "./../components/navbar/navbar.component";
import { useDatabase } from "./../contexts/DbContext";
import { useEffect } from "react";
import { useState } from "react";
import { CenterParent } from "../components/newsFeed/newsFeed.component";
import { EditPost } from "../components/editPost/editPost.component";
export const MyPostsPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { getPosts, deleteAPost, updateAPost, approveAPost } = useDatabase();
  useEffect(() => {
    const fetchS = async () => {
      const data = await getPosts();
      setMyPosts(data);
    };
    fetchS();
  }, []);
  const deletePost = async (uid, id) => {
    await deleteAPost(uid, id);
    const data = await getPosts();
    setMyPosts(data);
  };
  const updatePost = async (uid, id, text) => {
    await updateAPost(uid, id, text);
    const data = await getPosts();
    setMyPosts(data);
  };
  const approvePost = async (uid, id, currentValue) => {
    await approveAPost(uid, id, currentValue);
    const data = await getPosts();
    setMyPosts(data);
  };
  return (
    <>
      <Navbar title={"My Posts"} />
      <CenterParent>
        {myPosts.map((post, ix) => {
          let data = post.data;
          return (
            <EditPost
              key={ix}
              id={post.id}
              deleteCallback={deletePost}
              updateCallback={updatePost}
              approveCallback={approvePost}
              {...data}
            ></EditPost>
          );
        })}
      </CenterParent>
      ;
    </>
  );
};

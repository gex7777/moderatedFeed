import { Navbar } from "./../components/navbar/navbar.component";
import { useDatabase } from "./../contexts/DbContext";
import { useEffect } from "react";
import { useState } from "react";
import { CenterParent } from "../components/newsFeed/newsFeed.component";
import { EditPost } from "../components/editPost/editPost.component";
export const AllPostsPage = () => {
  const [myPosts, setMyPosts] = useState([{}]);
  const { getAllPosts, deleteAPost, updateAPost, approveAPost } = useDatabase();
  useEffect(() => {
    const fetchS = async () => {
      const data = await getAllPosts();
      setMyPosts(data);
    };

    fetchS();
  }, []);
  const deletePost = async (uid, id) => {
    await deleteAPost(uid, id);
    const data = await getAllPosts();
    setMyPosts(data);
  };
  const updatePost = async (uid, id, text) => {
    await updateAPost(uid, id, text);
    const data = await getAllPosts();
    setMyPosts(data);
  };
  const approvePost = async (uid, id, currentValue) => {
    await approveAPost(uid, id, currentValue);
    const data = await getAllPosts();
    setMyPosts(data);
  };

  return (
    <>
      <Navbar title={"All Post (Admin)"} />
      <CenterParent>
        {myPosts &&
          myPosts.map((post, ix) => {
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

import React, { useEffect } from "react";
import styled from "styled-components";
import { Post } from "./../post/post.component";
import { useDatabase } from "./../../contexts/DbContext";

export const CenterParent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
`;

export const NewsFeed = () => {
  const { data, getApprovedPosts } = useDatabase();

  useEffect(() => {
    getApprovedPosts();
  }, []);
  return (
    <CenterParent>
      {data &&
        data.map((post, ix) => {
          let data = post.data;
          return <Post key={ix} id={post.id} {...data} />;
        })}
    </CenterParent>
  );
};

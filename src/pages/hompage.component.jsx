import { Navbar } from "./../components/navbar/navbar.component";
import { InputPost } from "./../components/inputPost/inputPost.component";
import { NewsFeed } from "./../components/newsFeed/newsFeed.component";

export const Homepage = () => {
  return (
    <>
      <Navbar title={"Feed"} />
      <InputPost />
      <NewsFeed />
    </>
  );
};

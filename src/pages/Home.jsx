import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  // new
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedTag, setSelectedTag] = React.useState(null);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  // new
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setSelectedTag(null);
  };

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  // new
  const postsToRender = React.useMemo(() => {
    let filteredPosts = posts.items;

    if (selectedTag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.includes(selectedTag)
      );
    }

    if (tabValue === 0) {
      return filteredPosts;
    } else {
      return [...filteredPosts].sort((a, b) => b.viewsCount - a.viewsCount);
    }
  }, [tabValue, posts.items, selectedTag]);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabValue}
        onChange={handleChangeTab}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {(isPostsLoading ? [...Array(5)] : postsToRender).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
            onClickTag={handleTagClick}
            selectedTag={selectedTag}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Ivan Gokhem",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Test comment",
              },
              {
                user: {
                  fullName: "Test user",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

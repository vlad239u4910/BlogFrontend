import React from "react";

import styles from "./AddComment.module.scss";

import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { selectIsAuth } from "../../redux/slices/auth";

export const Index = ({
  userData,
  HandleCommentEnter,
  commentToAdd,
  HandleCommentSubmit,
}) => {
  const isAuth = useSelector(selectIsAuth);
  console.log(`userData: ${userData.avatarUrl}`);
  return (
    <>
      <div className={styles.root}>
        <Avatar
          className={styles.avatar}
          src={
            userData.avatarUrl
              ? `${process.env.REACT_APP_API_URL}${userData.avatarUrl}`
              : ""
          }
          alt={userData.fullName}
          sx={{ width: 40, height: 40 }}
        >
          {!userData.avatarUrl && userData.fullName
            ? userData.fullName[0].toUpperCase()
            : ""}
        </Avatar>
        <div className={styles.form}>
          <TextField
            onChange={HandleCommentEnter}
            label="Post comment"
            value={commentToAdd}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          {isAuth && (
            <Button variant="contained" onClick={HandleCommentSubmit}>
              Send
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

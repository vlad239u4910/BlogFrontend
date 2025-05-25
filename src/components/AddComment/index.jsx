import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({
  HandleCommentEnter,
  commentToAdd,
  HandleCommentSubmit,
}) => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
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
          <Button variant="contained" onClick={HandleCommentSubmit}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

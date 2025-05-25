import React from "react";
import styles from "./CommentsBlock.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchRemoveComment } from "../../redux/slices/comments";

import { SideBlock } from "../SideBlock";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

export const CommentsBlock = ({
  comments,
  children,
  isCommentsLoading = true,
  onCommentsChange,
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  return (
    <SideBlock title="Comments">
      <List>
        {(isCommentsLoading ? [...Array(5)] : comments).map(
          (comment, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" className={styles.commentItem}>
                <ListItemAvatar>
                  {isCommentsLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar
                      alt={comment.user.fullName}
                      src={comment.user.avatarUrl}
                    />
                  )}
                </ListItemAvatar>

                {isCommentsLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText
                    primary={comment.user.fullName}
                    secondary={comment.text}
                  />
                )}

                {!isCommentsLoading && userData?._id === comment.user._id && (
                  <div className={styles.editButtons}>
                    <IconButton color="primary" size="small"></IconButton>
                    <IconButton
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove comment?"
                          )
                        ) {
                          await dispatch(fetchRemoveComment(comment._id));
                          onCommentsChange?.();
                        }
                      }}
                      color="secondary"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )
        )}
      </List>
      {children}
    </SideBlock>
  );
};

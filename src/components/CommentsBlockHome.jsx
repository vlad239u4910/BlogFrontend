import React from "react";

import { SideBlock } from "./SideBlock";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

export const CommentsBlock = ({
  comments,
  children,
  isCommentsLoading = true,
}) => {
  return (
    <SideBlock title="Comments">
      <List>
        {(isCommentsLoading ? [...Array(5)] : comments).map(
          (comment, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
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
                    primary={
                      <Link
                        to={`/posts/${comment.post}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.textDecoration = "underline")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.textDecoration = "none")
                        }
                      >
                        {comment.user.fullName}
                      </Link>
                    }
                    secondary={
                      <Link
                        to={`/posts/${comment.post}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.textDecoration = "underline")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.textDecoration = "none")
                        }
                      >
                        {comment.text}
                      </Link>
                    }
                  />
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

import React from "react";
import styles from "./UserInfo.module.scss";
import { Avatar } from "@mui/material";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Avatar
        className={styles.avatar}
        src={avatarUrl ? `${process.env.REACT_APP_API_URL}${avatarUrl}` : ""}
        alt={fullName}
        sx={{ width: 40, height: 40 }}
      >
        {!avatarUrl && fullName ? fullName[0].toUpperCase() : ""}
      </Avatar>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};

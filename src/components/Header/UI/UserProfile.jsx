import React, { useState } from "react";
import styles from "./UserProfile.module.scss";

export const UserProfile = props => {
  

  return (
    <div className={styles.user_profile}>
        {props.user.name}
      <img src={"http://localhost/php_rest_agile_management/uploads/images/profile.jpg"} />
      
    </div>
  );
};

import React from "react";

const notificationStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = ({ message, notificationType }) => {
  const getNotificationStyle = () => {
    if (notificationType === "error") {
      return {
        ...notificationStyle,
        color: "red",
      };
    }
    return notificationStyle;
  };

  if (message === null) {
    return null;
  }

  return <div style={getNotificationStyle()}>{message}</div>;
};

export default Notification;

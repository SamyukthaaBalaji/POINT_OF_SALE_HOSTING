import React, { useState } from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBox,
  faUsers,
  faClipboardList,
  faUserTie,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const SideBar = () => {
  return (
    <div className="sidebar-outer">
      <div className="sidebar-inner-top">
        <img
          className="sidebar-user-image"
          src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
          alt="User"
        />
        <h3>John Doe</h3>
        <p className="sidebar-user-role">Admin</p>
      </div>
      <div className="sidebar-inner-middle">
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span>Dashboard</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faBox} />
          <span>Orders</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faUsers} />
          <span>Users</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Inventory</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faUserTie} />
          <span>Staffs</span>
        </div>
      </div>
      <div className="sidebar-inner-bottom">
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </div>
        <div className="sidebar-icons">
          <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faLinkedin} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

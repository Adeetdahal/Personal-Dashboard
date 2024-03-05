import React from "react";
import { newsData } from "../../../constants/newsNav";
import { NavItem } from "../Styles";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full p-8 gap-4">
      {newsData?.map(({ key, title, category }) => {
        return (
          <NavItem key={key} onClick={() => navigate(`${key}`)}>
            {title}
          </NavItem>
        );
      })}
    </div>
  );
};

export default Navbar;

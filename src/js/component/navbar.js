import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/">
                <span className="navbar-brand mb-0 custom-margin-left h1">Home</span>
            </Link>
            <div className="ml-auto custom-margin-right">
                <button className="btn btn-warning" onClick={() => navigate("/single")}>
                    Favorites ({store.favorites.length})
                </button>
            </div>
        </nav>
    );
};

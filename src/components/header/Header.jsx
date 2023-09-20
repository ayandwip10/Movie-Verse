import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, colors } from "@mui/material";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElSub1, setAnchorElSub1] = useState(null);

    const open = Boolean(anchorEl);
    const openSub1 = Boolean(anchorElSub1);

    const handleClick = (event) => {
        if (event.currentTarget.className === "mainMenu") {
            setAnchorEl(event.currentTarget);
        }
        else if (event.currentTarget.className === "movies") {
            setAnchorElSub1(event.currentTarget);
        }
    }
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElSub1(null);
    }
    return (
        <div className="header">
            <div className="headerLeft">
                <div className="fullscreen">
                    <div
                        id="fullScreenMovies"
                        className="movies"
                        aria-controls={openSub1 ? 'sub-menu1' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSub1 ? 'true' : undefined}
                        onClick={handleClick}
                        style={{ display: "flex", paddingRight: "20px" }}
                    >
                        <p>Movies</p>
                        <ArrowDropDownIcon />
                    </div>
                    <Menu
                        id="sub-menu1"
                        anchorEl={anchorElSub1}
                        open={openSub1}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'button1',
                        }}
                    >
                        <MenuItem onClick={handleClose}><Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Cpcoming</span></Link></MenuItem>
                    </Menu>
                </div>
                <div className="mobilescreen">
                    <div
                        id="basic-button"
                        className="mainMenu"
                        aria-controls={open ? 'main-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </div>
                    <Menu
                        id="main-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>
                            <div
                                id="button1"
                                className="movies"
                                aria-controls={openSub1 ? 'sub-menu1' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openSub1 ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ display: "flex" }}
                            >
                                <p style={{ paddingRight: "29%" }}>Movies</p>
                                <ArrowDropDownIcon />
                            </div>
                            <Menu
                                id="sub-menu1"
                                anchorEl={anchorElSub1}
                                open={openSub1}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'button1',
                                }}
                            >
                                <MenuItem onClick={handleClose}><Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Cpcoming</span></Link></MenuItem>
                            </Menu>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="headerRight">
                <Link to="/"><img src={Logo} alt="logo" className="logo" /></Link>
            </div>
        </div>
    )
}

export default Header;
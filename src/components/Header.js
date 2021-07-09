import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="bg-dark">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img
              src="https://i.pinimg.com/originals/11/3f/25/113f2514644ffc325eeb8b0ff7fe4f93.png"
              alt="logo"
              height="50px"
            />{" "}
            SpaceX
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

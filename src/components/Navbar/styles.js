import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  image: {
    marginRight: "10px",
    width: 40,
  },
  grow: {
    flexGrow: 1,
  },
}));

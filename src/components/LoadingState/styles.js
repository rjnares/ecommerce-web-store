import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    paddingTop: "100px",
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75rem",
    },
  },
}));

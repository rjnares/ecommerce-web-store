import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: "5%",
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginBottom: "50px",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "50px",
  },
  divider: {
    margin: "20px 0",
    borderBottom: "1px solid black",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: "60px",
  },
}));

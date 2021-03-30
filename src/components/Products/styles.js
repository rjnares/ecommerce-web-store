import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  title: {
    margintop: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.25rem",
    },
  },
}));

import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.25rem",
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  cartDetails: {
    display: "flex",
    marginTop: "10%",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-around",
    },
  },
  cartButtons: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "15px",
      width: 0,
      flex: 1,
    },
    [theme.breakpoints.up("md")]: {
      marginRight: 30,
    },
  },
  checkoutButton: {
    minWidth: "150px",
    width: 0,
    flex: 1,
  },
  subtotal: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  textDivider: {
    [theme.breakpoints.up("md")]: {
      width: "2rem",
    },
  },
}));

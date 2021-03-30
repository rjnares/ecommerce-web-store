import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "100%", //"56.25%", // 16:9
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  cardBottom: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
}));

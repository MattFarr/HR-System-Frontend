import { Button, makeStyles, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { updateSort } from "../../helpers/sort/sortHelper";
import { ISort } from "../../models/sort/ISort";

interface SortButtonProps {
  label: string;
  field: string;
  sortObject: ISort;
  setSort: (sort: ISort) => void;
}

const useStyles = makeStyles(() => ({
  sortButton: {
    margin: "0 5px",
    width: "145px",
  },
}));

const SortButton = (props: SortButtonProps): JSX.Element => {
  const classes = useStyles();
  const { label, field, sortObject, setSort } = props;

  return (
    <Button
      className={classes.sortButton}
      variant="contained"
      color="primary"
      onClick={() => setSort(updateSort(field, sortObject))}
      endIcon={
        sortObject.field === field ? (
          sortObject.direction === "asc" ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )
        ) : null
      }
    >
      <Typography variant="body2">{label}</Typography>
    </Button>
  );
};

export default SortButton;

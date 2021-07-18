import { orderBy } from "lodash";
import { ISort } from "../../models/sort/ISort";

export const updateSort = (field: string, currentSort: ISort): ISort => {
  return {
    field,
    direction:
      field !== currentSort.field
        ? "asc"
        : currentSort.direction === "asc"
        ? "desc"
        : "asc",
  };
};

export const sortList = <T>(list: T[], sort: ISort): T[] => {
  if (sort) {
    list = orderBy(list, [sort.field], [sort.direction]);
  }
  return list;
};

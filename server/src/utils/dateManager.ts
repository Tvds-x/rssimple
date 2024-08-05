import moment from "moment";

let startOfYesterday = moment()
  .utc()
  .subtract(1, "days")
  .startOf("day")
  .valueOf();

export function updateStartOfYesterday() {
  startOfYesterday = moment()
    .utc()
    .subtract(1, "days")
    .startOf("day")
    .valueOf();
}
export const getStartOfYesterday = () => startOfYesterday;

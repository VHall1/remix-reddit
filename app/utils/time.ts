export function timeSince(date: Date, now: Date = new Date()) {
  const differenceInMilliseconds = now.getTime() - date.getTime();
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  let formattedDifference;
  if (differenceInDays > 0) {
    formattedDifference = rtf.format(-differenceInDays, "day");
  } else if (differenceInHours > 0) {
    formattedDifference = rtf.format(-differenceInHours, "hour");
  } else if (differenceInMinutes > 0) {
    formattedDifference = rtf.format(-differenceInMinutes, "minute");
  } else {
    formattedDifference = rtf.format(-differenceInSeconds, "second");
  }

  return formattedDifference;
}

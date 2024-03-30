import dayjs from "dayjs";
import { COUNTRY_CODE, MONTH_NAMES } from "./constants";

const now = dayjs();

export const capitalizeFirstLetter = (value: string): string => {
  const modifiedString = value?.charAt(0)?.toUpperCase() + value?.slice(1);
  return modifiedString;
};

export const calculateAge = (dob: Date | null): string => {
  if (!dob || isNaN(+new Date(dob))) {
    return "";
  }
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return `${age} Yrs`;
};

export const randomBGColor = (firstLetter: string): string => {
  const bgColor = [
    "#FCE7F6",
    "#D1E9FF",
    "#EBE9FE",
    "#FFEAD5",
    "#FFE4E8",
    "#FCE7F6",
    "#D1E9FF",
    "#EBE9FE",
    "#FFEAD5",
    "#FFE4E8",
    "#FCE7F6",
    "#D1E9FF",
  ];
  const randomIndex = Math.floor((firstLetter?.toLowerCase().charCodeAt(0) - 97) % 8);
  const item = bgColor[randomIndex];
  return item;
};

export const randomTextColor = () => {
  const textColor = [
    "C11574",
    "#175CD3",
    "#5925DC",
    "#EC4A0A",
    "#E31B54",
    "#C11574",
    "#175CD3",
    "#5925DC",
    "#EC4A0A",
    "#E31B54",
    "#C11574",
    "#175CD3",
  ];
  const randomIndex = Math.floor(Math.random() * textColor.length);
  const item = textColor[randomIndex];
  return item;
};

export const formatDate = (dateString: string, toolTip: boolean): string => {
  const time: string = new Date().toLocaleTimeString();
  const day: number = new Date(dateString).getDate();
  const month: string = MONTH_NAMES[new Date(dateString).getUTCMonth()];
  const years: number = new Date(dateString).getFullYear();
  if (toolTip) {
    return `${day} ${month} ${years}, ${time}`;
  }
  return `${day} ${month} ${years}`;
};

export const convertDateToHoursOrSeconds = (date: Date) => {
  const now = new Date();
  const diffMilliseconds = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    if (diffMinutes === 0) {
      return `--`;
    } else {
      return `${diffSeconds} seconds ago`;
    }
  } else if (diffHours < 24) {
    if (diffHours === 0) {
      return `--`;
    } else {
      return `${diffHours} hours ago`;
    }
  } else {
    return `${diffDays} days ago`;
  }
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return `${COUNTRY_CODE} (${phoneNumber?.substring(0, 3)}) ${phoneNumber?.substring(3, 6)}-${phoneNumber?.substring(6, 10)}`;
};

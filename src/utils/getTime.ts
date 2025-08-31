import { ElMessage } from "element-plus";

interface TimeInfo {
  year: string | number;
  month: string | number;
  day: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
  weekday: string;
}

interface ProgressInfo {
  elapsed: number;
  pass: number;
}

interface TimeCapsule {
  day: ProgressInfo;
  week: ProgressInfo;
  month: ProgressInfo;
  year: ProgressInfo;
}


// 时钟
export const getCurrentTime = (): TimeInfo => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
  return {year, month, day, hours, minutes, seconds, weekday};
}

export const getTimeCapsule = (): TimeCapsule => {
  const now = new Date();
  // 日进度
  const todayStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const todayPassHours = (now.getTime() - todayStartDate) / 1000 / 60 / 60;
  const todayPassHoursPercent = (todayPassHours / 24) * 100;

  // 周进度
  const weeks = [7, 1, 2, 3, 4, 5, 6];
  const weekDay = weeks[now.getDay()];
  const weekDayPassPercent = (weekDay / 7) * 100;

  // 月进度
  const year = new Date().getFullYear();
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const monthAll = new Date(year, month, 0).getDate();
  const monthPassPercent = (date / monthAll) * 100;

  // 年进度
  const yearStartDate = new Date(year, 0, 1).getTime();
  const yearEndDate = new Date(year + 1, 0, 1).getTime();
  const yearPassHours = (now.getTime() - yearStartDate) / 1000 / 60 / 60;
  const yearTotalHours = (yearEndDate - yearStartDate) / 1000 / 60 / 60;
  const yearPassPercent = (yearPassHours / yearTotalHours) * 100;
    
  return {
    day: { elapsed: Math.floor(todayPassHours), pass: Math.floor(todayPassHoursPercent) },
    week: { elapsed: weekDay, pass: Math.floor(weekDayPassPercent) },
    month: { elapsed: date, pass: Math.floor(monthPassPercent) },
    year: { elapsed: month, pass: Math.floor(yearPassPercent) },
  };
}

// 欢迎提示
export const helloInit = () => {
  const hour = new Date().getHours();
  let hello: String = "";
  if (hour < 6) hello = "凌晨好";
  else if (hour < 9) hello = "早上好";
  else if (hour < 12) hello = "上午好";
  else if (hour < 14) hello = "中午好";
  else if (hour < 17) hello = "下午好";
  else if (hour < 19) hello = "傍晚好";
  else if (hour < 22) hello = "晚上好";
  else hello = "夜深了";

  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `<strong>${hello}</strong> 欢迎来到我的主页`,
  });
}

// 建站日期统计
export const siteDateStatistics = (startDate: Date) => {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInMonths / 12;
  if (differenceInYears >= 1) {
    return `本站已经苟活了 ${Math.floor(differenceInYears)} 年 ${Math.floor(differenceInMonths % 12,)} 月 ${Math.round(differenceInDays % 30)} 天`;
  } else if (differenceInMonths >= 1) {
    return `本站已经苟活了 ${Math.floor(differenceInMonths)} 月 ${Math.round(differenceInDays % 30,)} 天`;
  } else return `本站已经苟活了 ${Math.round(differenceInDays)} 天`;
}
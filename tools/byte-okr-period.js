const currentOKRRange = () => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const res = [];

  let iYear = nowYear - 2;
  let iMonth = nowMonth % 2 === 0 ? nowMonth + 1 : nowMonth;
  while (iYear < nowYear + 2) {
    const nextMonth = iMonth + 1;
    res.push({
      label: `${iYear}年${iMonth}月-${nextMonth}月`,
      value: `${iYear}年${iMonth}月-${nextMonth}月`,
    });
    iMonth += 2;
    if (iMonth > 12) {
      iMonth = 1;
      iYear += 1;
    }
  }
  return res;
};

currentOKRRange();
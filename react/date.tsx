import React, { ReactElement, useState } from 'react';
import { DatePicker } from '@bytedesign/web-react';
// @ts-ignore
import styles from './index.scss';

interface Props {
}
const nowTime = new Date();
const today = {
  Y: nowTime.getFullYear(),
  M: nowTime.getMonth(),
  D: nowTime.getDate(),
};

function isToday(Y: number, M: number, D: number) {
  return today.Y === Y && today.M === M && today.D === D;
}

const cached: any = {};
let busyDate = new Set();

export default function index(): ReactElement {
  const [isBusy, setIsBusy] = useState(busyDate);

  function fetchBusyTime(Y: number, M: number) {
    const current = `${Y}${M}`;
    cached[`${Y}${M}`] = true;
    setTimeout(() => {
      const newBusy = new Set();
      busyDate.forEach((v: any) => {
        if (!v.startsWith(current)) newBusy.add(v);
      });
      new Array(3).fill(1).forEach((v, i) => {
        newBusy.add(`${Y}${M}${i + 1}`);
      });
      busyDate = newBusy;
      setIsBusy(new Set(busyDate));
    }, 1000);
  }

  function className(currentDate: any) {
    return `
      ${isToday(currentDate.$y, currentDate.$M, currentDate.$D) ? ' select-date-today' : ''}
      ${isBusy.has(`${currentDate.$y}${currentDate.$M}${currentDate.$D}`) ? ' select-date-busy' : ''}
    `;
  }

  function dateRender(currentDate: any) {
    if (!cached[`${currentDate.$y}${currentDate.$M}`]) {
      fetchBusyTime(currentDate.$y, currentDate.$M);
    }
    return (
      <div className={`byte-datepicker-date${className(currentDate)}`}>
        <div className="byte-datepicker-date-inner">{currentDate.$D}</div>
      </div>
    );
  }

  return (
    <DatePicker.RangePicker
      dateRender={dateRender}
      className={`${styles.test}`}
    />
  );
}

import './ActivityGraphPage.css';
import Header from '../component/Header.tsx';
import MenuButton from '../component/button/MenuButton.tsx';
import SearchButton from '../component/button/SearchButton.tsx';
import UserButton from '../component/button/UserButton.tsx';
import SubBar from '../component/sub-bar/SubBar.tsx';
import WriteButton from '../component/button/WriteButton.tsx';
import TagButton from '../component/button/TagButton.tsx';
import http from '../api/http.js';
import { useEffect, useState } from 'react';

interface Content {
  id: string,
  user_id: string,
  tag_id: string,
  tag_name: string,
  title: string,
  content: string,
  create_year: number,
  create_month: number,
  create_date: number
};

export default function ActivityGraphPage() {
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);

  const [frequencyList, setFrequencyList] = useState(null);

  const today = new Date();
  const curDate: number = today.getDate();
  const curYear: number = today.getFullYear();
  const curMonth: number = today.getMonth() + 1;
  const [selectYear, setSelectYear] = useState(curYear);
  const [selectMonth, setSelectMonth] = useState(curMonth);
  const [selectDate, setSelectDate] = useState(curDate);
  const startDayOfMonth: number = new Date(selectYear, selectMonth - 1, 1).getDay();
  const dateNumOfMonth: number = new Date(selectYear, selectMonth, 0).getDate();

  const dateList = Array.from({length: startDayOfMonth + dateNumOfMonth}, (_, i) => i + 1 - startDayOfMonth);

  const dayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function increateMonth() {
    setSelectDate(1);
    if (selectMonth != 12) {
      setSelectMonth(selectMonth + 1);
    } else {
      setSelectMonth(1);
      setSelectYear(selectYear + 1);
    }
  }

  function decreateMonth() {
    setSelectDate(1);
    if (selectMonth != 1) {
      setSelectMonth(selectMonth - 1);
    } else {
      setSelectMonth(12);
      setSelectYear(selectYear - 1);
    }
  }

  // 특정 날짜의 데이터 받아옴
  useEffect(() => {
    const fetchContents = async () => {
    try {
      const res = await http.get(`/contents?create_year=${selectYear}&create_month=${selectMonth}&create_date=${selectDate}`, {});
      setContents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }}

    fetchContents();
  }, [selectYear, selectMonth, selectDate]);

  // 글 빈도 배열 데이터 받아옴
  useEffect(() => {
    const fetchFrequencyList = async () => {
    try {
      const res = await http.get(`/frequency/${selectMonth}`, {});
      setFrequencyList(res.data.list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }}

    fetchFrequencyList();
  }, [selectYear, selectMonth]);

  return (
    <div>
      {/* 헤더 */}
      <Header
        left={
          <MenuButton />
        }
        center={
          <div className="logo">
            Today I Learned
          </div>
        }
        right={
          <div className="header-right-menu">
            <SearchButton />
            <UserButton />
          </div>
        }
      />

      {/* 메뉴 바 */}
      <SubBar leftDOM={<></>} />

      {/* body */}
      <div className="activity-body">

        {/* 잔디 */}
        <div className="activity-graph">
          <div className="activity-graph-header">
            {/* 달 감소 */}
            <div className="calendar-left-icon" onClick={decreateMonth}>
              &lt;
            </div>
            {/* 선택 년/월 */}
            <div>{selectYear}.{selectMonth}</div>
            {/* 달 증가 */}
            <div className="calendar-right-icon" onClick={increateMonth}>
              &gt;
            </div>
          </div>
          {/* 달력 */}
          <div className="activity-graph-calendar-header">
            {dayList.map((day: string) => {
              return (<div key={day}>{day}</div>);
            })}
          </div>
          <div className="activity-graph-calendar">
            {frequencyList && dateList.map((date: number, idx: number) => {
              return (<AcitityCell date={date} selectDate={selectDate} setSelectDate={setSelectDate} frequency={frequencyList[idx]} />);
            })}
          </div>
        </div>

        {/* 날짜 별 세부 정보 */}
        <div className="activity-detail">
          <div className="activity-detail-date">
            {selectYear}.{selectMonth}.{selectDate}
          </div>
          <div>
            {contents && contents.map((content: Content) => {
              return (
                <div className="activity-detail-content">
                  <div className="activity-detail-tag">
                    <TagButton tagId={content.tag_id} tagName={content.tag_name} />
                  </div>
                  <div className="activity-detail-title">
                    { content.title }
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
      <WriteButton />
    </div>
  );
}

function AcitityCell({ date, selectDate, setSelectDate, frequency }) {
  function getStyleByFreq() {
    if (frequency === 1) {
      return 'activity-cell-1';
    } else if (frequency === 2) {
      return 'activity-cell-2';
    } else if (frequency > 3) {
      return 'activity-cell-3';
    } else {
      return '';
    }
  }

  return (
    <div className={`activity-cell ${date === selectDate ? "activity-cell-selected" : ""} ${getStyleByFreq()}`} onClick={() => {date > 0 && setSelectDate(date)}}>
      {date > 0 ? date : ''}
    </div>
  );
}
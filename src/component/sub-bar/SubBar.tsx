import { Link } from 'react-router-dom';
import './SubBar.css';

export default function SubBar({ leftDOM }) {
  return (
    <div className="sub-bar">
      {/* 좌측 메뉴 */}
      <div className="left-menu">
        {leftDOM}
      </div>

      {/* 디스플레이 설정 버튼 */}
      <div className="right-menu">
        <Link to="/" className="link list-link">
          <img src="../../image/list-icon.png" alt="list" className="list-icon" />
        </Link>
        <Link to="/activity" className="link group-link">
          <img src="../../image/group-icon.png" alt="group" className="group-icon" />
        </Link>
      </div>
    </div>
  );
}
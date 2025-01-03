import './WriteButton.css';
import { Link } from 'react-router-dom';

export default function WriteButton() {
  return (
    <Link to="/write" className="link">
      <div className="write-btn">
        +
      </div>
    </Link>
  );
}
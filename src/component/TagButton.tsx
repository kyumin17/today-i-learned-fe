import './TagButton.css';
import { Link } from 'react-router-dom';

export default function TagButton({ tagId, tagName }) {
  return (
    <Link to={`/${tagId}`} className="link">
      <div className="tag-btn">
        {tagName}
      </div>
    </Link>
  );
}
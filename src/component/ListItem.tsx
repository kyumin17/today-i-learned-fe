import './ListItem.css';
import TagButton from './TagButton.tsx';
import { Link } from 'react-router-dom';

export default function ListItem({ contentId, title, tagId, tagName }) {
  return (
    <Link to={`/content/${contentId}`} className="link">
      <div className="list-item">
        <div className="list-title">{title}</div>
        <TagButton tagId={tagId} tagName={tagName} />
        <div className="list-more-info">...</div>
      </div>
    </Link>
  );
}
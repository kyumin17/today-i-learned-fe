import './TagButton.css';
import { useNavigate } from 'react-router-dom';

export default function TagButton({ tagId, tagName }) {
  const navigate = useNavigate();

  return (
    <div className="tag-btn" onClick={() => {navigate(`/${tagId}`);}}>
      {tagName}
    </div>
  );
}
import './TagButton.css';

export default function TagButton({ tagId, tagName }) {
  return (
    <div className="tag-btn">
      {tagName}
    </div>
  );
}
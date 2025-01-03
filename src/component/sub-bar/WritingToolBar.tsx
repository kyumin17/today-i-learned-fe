import { RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './WritingToolBar.css';

export default function WritingToolBar({ editorState, setEditorState }) {
  function toggleStyle(event: React.MouseEvent<HTMLButtonElement>, style: string) {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  function toggleHeader(event: React.MouseEvent<HTMLButtonElement>, size: string) {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, `header-${size}`));
  }

  return (
    <div className="tool-bar">
      <button className="tool" onClick={(e) => {toggleHeader(e, "two")}}>
        h1
      </button>
      <button className="tool" onClick={(e) => {toggleHeader(e, "three")}}>
        h2
      </button>
      <button className="tool" onClick={(e) => {toggleHeader(e, "four")}}>
        h3
      </button>
      <button className="tool" onClick={(e) => {toggleStyle(e, "BOLD")}}>
        <span style={{fontWeight: "500"}}>B</span>
      </button>
      <button className="tool" onClick={(e) => {toggleStyle(e, "ITALIC")}}>
        <i>i</i>
      </button>
      <button className="tool" onClick={(e) => {toggleStyle(e, "UNDERLINE")}}>
        <span style={{textDecoration: "underline"}}>U</span>
      </button>
      <button className="tool" onClick={(e) => {toggleStyle(e, "STRIKETHROUGH")}}>
        <span style={{textDecoration: "line-through"}}>T</span>
      </button>
      <button className="tool">
        <img src="../image/code-icon.png" className="code-icon" alt="code" />
      </button>
      <button className="tool">
        <img src="../image/image-icon.png" className="image-icon" alt="img" />
      </button>
      <button className="tool">
        <img src="../image/link-icon.png" className="link-icon" alt="link" />
      </button>
    </div>
  );
}
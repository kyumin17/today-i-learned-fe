import './WritePage.css';
import Header from '../component/Header';
import WritingToolBar from '../component/WritingToolBar.tsx';
import TagSelectButton from '../component/TagSelectButton.tsx';
import { Editor, EditorState } from 'draft-js';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import http from '../api/http.js';

export default function WritePage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )
  const today = new Date();
  const curDate: number = today.getDate();
  const curYear: number = today.getFullYear();
  const curMonth: number = today.getMonth() + 1;

  const titleRef = useRef(null);

  const navigate = useNavigate();

  const [selectTag, setSelectTag] = useState(null);
  const [selectTagId, setSelectTagId] = useState(null);

  async function saveContent() {
    const title = titleRef.current.value;
    const content = editorState.getCurrentContent().getPlainText();

    if (!title || !content) {
      alert("please write title or content");
      return;
    }

    const form = {
      user_id: 1,
      tag_id: selectTagId,
      tag_name: selectTag,
      title: titleRef.current.value,
      content: editorState.getCurrentContent().getPlainText(),
      create_year: curYear,
      create_month: curMonth,
      create_date: curDate
    };

    try {
      await http.post('/contents', form);
    } catch(err) {
      console.log(err);
    }

    navigate('/');
  }

  function cancel() {
    alert('Are you sure cancel writing?');

    navigate('/');
  }

  return (
    <div>
      <Header 
        left={<div className="cancel-btn" onClick={cancel}>
          cancel
        </div>}
        center={<div className="writing-date">
          {curYear}.{curMonth}.{curDate}
        </div>}
        right={<div className="save-btn" onClick={saveContent}>save</div>} 
      />
      <WritingToolBar editorState={editorState} setEditorState={setEditorState} />

      {/* 글 쓰는 영역 */}
      <div className="text-area">
        {/* 제목 */}
        <div className="text-area-header">
          <input type="text" className="text-area-title" spellCheck="false" placeholder="Title" ref={titleRef} />
        </div>
        {/* 태그 선택 */}
        <TagSelectButton selectTag={selectTag} setSelectTag={setSelectTag} selectTagId={selectTagId} setSelectTagId={setSelectTagId} />
        {/* 본문 */}
        <TextArea editorState={editorState} setEditorState={setEditorState} />
      </div>

    </div>
  );
}

function TextArea({ editorState, setEditorState }) {
  return (
    <div className="text-area-body">
      <Editor 
        editorState={editorState} 
        onChange={setEditorState} 
        placeholder="Write what did you learned..."
      />
    </div>
  );
}
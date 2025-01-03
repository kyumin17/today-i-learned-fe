import './TagSelectButton.css';
import { useState, useEffect } from 'react';
import http from '../../api/http.js';

export default function TagSelectButton({ selectTag, setSelectTag, selectTagId, setSelectTagId }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(true);

  // tag data 받아옴
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await http.get('/tags', {});
        setTags(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchTags();
  }, []);

  let tagDomList = [];

  function setTag(name: string, id: string) {
    setSelectTag(name);
    setIsVisible(false);
    setSelectTagId(id);
  }

  // 태그 받아옴
  function dfs(id: string, depth: number) {
    if (id !== "0") {
      tagDomList.push(
        <div className="tag-select-menu-tag" style={{marginLeft: `${(depth - 1) * 0.6}rem`}} onClick={() => {setTag(tags[id].name, id)}}>
          {tags[id].name}
        </div>
      );
    }

    for (let i of tags[id].child) {
      dfs(i, depth + 1);
    }
  }

  if (tags) {
    dfs("0", 0);
  }

  return (
    <div>
      <div className={`tag-select-btn ${selectTagId ? "tag-select-btn-activate" : ""}`} onClick={() => setIsVisible(!isVisible)}>
        {selectTag || 'select tag'}
      </div>
      {isVisible && <div className="tag-select-menu">
        {tagDomList.map((dom) => {
          return dom;
        })}
      </div>}
    </div>
  );
}
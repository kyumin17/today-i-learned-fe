import './MenuButton.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import http from '../api/http.js';

export default function MenuButton() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="menu-btn" onClick={() => {setIsVisible(true)}}>
        <img src="../../image/menu-icon.png" alt="menu" className="menu-icon" />
      </div>
      {isVisible && <Menu isVisible={isVisible} setIsVisible={setIsVisible} />}
    </div>
  );
}

function Menu({ isVisible, setIsVisible }) {
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(true);

  // 현재 tag 필터
  let tagId = useParams().tag_id;

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

  // 태그 받아옴
  function dfs(id: string, depth: number) {
    if (id !== "0") {
      tagDomList.push(
        <div className="menu-bar-tag" style={{marginLeft: `${(depth - 1) * 0.6}rem`}} onClick={() => {setIsVisible(false)}}>
          <Link to={`/${id}`} className="link">
            <span 
              className={`menu-bar-tag-icon ${id === tagId ? "menu-bar-tag-icon-select" : ""}`}>
              #
            </span>
            {tags[id].name}
          </Link>
          <div className="menu-bar-more">
            ...
          </div>
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
    <div className="menu">
      <div className="menu-bar">
        <div className="menu-bar-title" onClick={() => {setIsVisible(false)}}>
          <Link to="/" className="link">
            Today I Learned
          </Link>
        </div>
        <div className="menu-bar-tag">
          {tagDomList.map((dom) => {
            return dom;
          })}
        </div>
      </div>
      <div className="menu-background" onClick={() => {setIsVisible(false)}}>
      </div>
    </div>
  );
}
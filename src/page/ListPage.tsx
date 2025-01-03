import './ListPage.css';
import ListItem from '../component/ListItem.tsx';
import Header from '../component/Header.tsx';
import MenuButton from '../component/button/MenuButton.tsx';
import SearchButton from '../component/button/SearchButton.tsx';
import UserButton from '../component/button/UserButton.tsx';
import WriteButton from '../component/button/WriteButton.tsx';
import SubBar from '../component/sub-bar/SubBar.tsx';
import { useState, useEffect } from 'react';
import http from '../api/http.js';
import { useParams, Link } from 'react-router-dom';

interface Content {
  id: string,
  user_id: string,
  tag_id: string,
  tag_name: string,
  title: string,
  content: string,
  create_year: number,
  create_month: number,
  create_date: number
};

export default function ListPage() {
  const [contents, setContents] = useState([]);
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(true);

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

  let tagId = useParams().tag_id;

  // 하위 태그 게시글들 필터에 추가
  let filter = ''
  function getChildTag(id: string) {
    filter += `?tag_id=${id}&`
    
    // 백에서 구현 필요
    // for (let i of tags[id].child) {
    //   getChildTag(i);
    // }
  }

  if (tags && tagId) {
    getChildTag(tagId);
  }

  // 게시글 불러옴
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await http.get(`/contents${filter}`, {});
        setContents(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchContents();
  }, [filter]);

  return (
    <div>
      {/* 헤더 */}
      <Header
        left={
          <MenuButton />
        }
        center={
          <div className="logo">
            Today I Learned
          </div>
        }
        right={
          <div className="header-right-menu">
            <SearchButton />
            <UserButton />
          </div>
        }
      />

      {/* tag 필터 있을 시 sub bar 띄움 */}
      <SubBar leftDOM={tagId ? <Breadcrumb tags={tags} tagId={tagId} /> : <></>} />

      {/* 글 리스트 */}
      {contents.map((content: Content) => {
        return (
          <ListItem key={content.id} contentId={content.id} title={content.title} tagId={content.tag_id} tagName={content.tag_name} />
        );
      })}

      {/* 글 작성 버튼 */}
      <WriteButton />
    </div>
  );
}

function Breadcrumb({ tags, tagId }) {
  // tag 관계 리스트로 저장
  let next: string = tagId;
  let tagList: string[] = [];

  if (tags) {
    while (next != "0") {
      tagList.push(next);
      next = tags[next].parent;
    }
    tagList.reverse();
  }

  return (
    <div className="breadcrumb">
      {tagList.map((id: string, idx: number) => {
        return (
          <div className="breadcrumb-tag" key={id}>
            <Link to={`/${id}`} className="link">
              {tags[id].name}
            </Link>
            {idx !== tagList.length - 1 && <span className="breadcrumb-icon">&gt;</span>}
          </div>
        );
      })}
    </div>
  );
}
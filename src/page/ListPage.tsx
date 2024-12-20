import './ListPage.css';
import ListItem from '../component/ListItem.tsx';
import Header from '../component/Header.tsx';
import MenuButton from '../component/MenuButton.tsx';
import SearchButton from '../component/SearchButton.tsx';
import UserButton from '../component/UserButton.tsx';

export default function ListPage() {
  const contentList = [
    {id: 1, title: 'hello', tag_id: '1', tag_name: 'tag'},
    {id: 1, title: 'hello', tag_id: '1', tag_name: 'tag'}
  ];

  return (
    <div>
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
      <SubBar tag={"tag"} />
      {contentList.map((content) => {
        return (<ListItem contentId={content.id} title={content.title} tagId={content.tag_id} tagName={content.tag_name} />);
      })}
    </div>
  );
}

function SubBar({ tag }) {
  return (
    <div className="sub-bar">
      <div className="breadcrumb">{tag}</div>
      <div className="right-menu">
        <img src="../../image/list-icon.png" alt="list" className="list-icon" />
        <img src="../../image/group-icon.png" alt="group" className="group-icon" />
      </div>
    </div>
  );
}
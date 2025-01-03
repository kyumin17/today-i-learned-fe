import './App.css';
import ListPage from './page/ListPage.tsx';
import ContentPage from './page/ContentPage.tsx';
import WritePage from './page/WritePage.tsx';
import SettingPage from './page/SettingPage.tsx';
import LoginPage from './page/LoginPage.tsx';
import SignupPage from './page/SignupPage.tsx';
import ActivityGraphPage from './page/ActivityGraphPage.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 글 목록 */}
          <Route path='/' element={<ListPage />} />
          {/* 글 목록 태그 필터링 */}
          <Route path='/:tag_id' element={<ListPage />} />
          {/* 글 세부 */}
          <Route path='/conent/:content_id' element={<ContentPage />} />
          {/* 글 작성 */}
          <Route path='/write' element={<WritePage />} />
          {/* 글 편집 */}
          <Route path='/write/:content_id' element={<WritePage />} />
          {/* 설정 */}
          <Route path='/setting' element={<SettingPage />} />
          {/* 로그인 */}
          <Route path='/login' element={<LoginPage />} />
          {/* 가입 */}
          <Route path='/signup' element={<SignupPage />} />
          {/* 잔디 */}
          <Route path='/activity' element={<ActivityGraphPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

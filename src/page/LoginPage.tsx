import './LoginPage.css';
import InputBox from '../component/input/InputBox';
import LoginButton from '../component/button/LoginButton';

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-title">Login</div>
      <div className="login-input">
        <InputBox type="text" label="ID" />
        <InputBox type="password" label="Password" />
      </div>
      <LoginButton />
    </div>
  );
}
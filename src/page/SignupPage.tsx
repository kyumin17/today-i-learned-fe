import './SignupPage.css';
import InputBox from '../component/input/InputBox';
import SignupButton from '../component/button/SignupButton';

export default function SignupPage() {
  return (
    <div className="signup-page">
      <div className="signup-title">Create Account</div>
      <div className="signup-input">
        <InputBox type="text" label="ID" />
        <InputBox type="password" label="Password" />
        <InputBox type="text" label="email" />
      </div>
      <SignupButton />
    </div>
  );
}
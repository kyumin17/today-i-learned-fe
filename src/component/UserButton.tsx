import './UserButton.tsx';
import { useState } from 'react';

export default function UserButton() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="user-btn" onClick={() => {setIsVisible(!isVisible)}}>
      </div>
      {isVisible && <UserMenu />}
    </div>
  );
}

function UserMenu() {
  return (
    <div className="user-menu">
      <div>Share</div>
      <div>Setting</div>
      <div>Logout</div>
    </div>
  );
}
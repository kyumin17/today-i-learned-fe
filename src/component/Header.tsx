import './Header.css';

export default function Header({ left, center, right }) {
  return (
    <div className="header">
      <div className="header-left">{left}</div>
      <div className="header-center">{center}</div>
      <div className="header-right">{right}</div>
    </div>
  );
}
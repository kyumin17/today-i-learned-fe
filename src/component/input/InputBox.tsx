import './InputBox.css';

export default function InputBox({ label, type }) {
  return (
    <div className="input-box">
      <div className="input-label">{label}</div>
      <input type={type} className="input-area" />
    </div>
  );
}
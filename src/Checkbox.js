import "./Checkbox.scss";

const Checkbox = ({ value, onChange }) => (
    <input
      className="ic_checkmark"
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
);
export default Checkbox;

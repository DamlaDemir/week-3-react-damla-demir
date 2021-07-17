import "./style.css";

const Dropdown = ({ name, options, onChangeDropdown }) => {
  return (
    <div className="form-item">
      <label htmlFor={name}>Choose a {name}:</label>
      <select name={name} id={name} onChange={onChangeDropdown}>
        <option value="-1" selected disabled>
          Please select..
        </option>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;

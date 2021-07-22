import { useState } from "react";

export default function ProjectBoxSearch({ onProjectBoxSearch }) {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (value) => {
    setSearch(value);
    onProjectBoxSearch(value);
  };

  return (
    <div className="row">
      <input
        type="search"
        className="form-control"
        placeholder="Filter by project name"
        value={search}
        onChange={({ target: { value } }) => handleChangeSearch(value)}
      />
    </div>
  );
}

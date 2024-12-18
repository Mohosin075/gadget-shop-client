import { FieldValues, SubmitHandler } from "react-hook-form";

type SearchBarProps = {
  handleSearch: SubmitHandler<FieldValues>;
};
function SearchBar({ handleSearch }: SearchBarProps) {
  return (
    <form onSubmit={handleSearch}>
      <div className="join">
        <input
          className="input input-bordered join-item"
          placeholder="Search"
          name="search"
        />
        <button type="submit" className="btn join-item rounded-r-full">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

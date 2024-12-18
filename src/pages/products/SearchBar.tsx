function SearchBar({ handleSearch }) {
  return (
    <form onSubmit={handleSearch}>
      <div className="join">
        <input
          className="input input-bordered join-item"
          placeholder="Search"
          name="search"
        />
        <button type="submit" className="btn join-item rounded-r-full">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;

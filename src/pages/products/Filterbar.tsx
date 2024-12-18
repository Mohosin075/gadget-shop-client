function Filterbar({
  setBrand,
  setCategory,
  handleReset,
  uniqueCategory,
  uniqueBrand,
}) {
  return (
    <div className="bg-gray-200 h-screen px-6 sticky top-0">
      <h2 className="text-xl font-semibold py-3">Filter</h2>
      <div className="space-y-3">
        <select
          onChange={(e) => setBrand(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" selected>
            all brand
          </option>

          {uniqueBrand.map((brand, i) => (
            <option value={brand} key={i}>
              {brand}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" selected>
            all category
          </option>

          {uniqueCategory.map((category, i) => (
            <option value={category} key={i}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleReset} className="btn btn-primary w-full">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filterbar;

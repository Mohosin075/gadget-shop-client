function Filterbar() {
  return (
    <div className="bg-gray-200 h-screen px-6 sticky top-0">
      <h2 className="text-xl font-semibold py-3">Filter</h2>
      <div className="space-y-3">
        <select className="select select-bordered w-full max-w-xs">
          <option selected>brand</option>
          <option>low to high</option>
        </select>
        <select className="select select-bordered w-full max-w-xs">
          <option selected>category</option>
          <option>low to high</option>
        </select>
        <button className="btn btn-primary w-full">Reset</button>
      </div>
    </div>
  );
}

export default Filterbar;

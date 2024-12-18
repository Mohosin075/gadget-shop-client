import { Dispatch, SetStateAction } from "react";

type SortByPriceProps = {
  setSort: Dispatch<SetStateAction<string>>;
};

function SortByPrice({ setSort }: SortByPriceProps) {
  return (
    <select
      onChange={(e) => setSort(e.target.value)}
      className="select select-bordered w-full max-w-xs"
    >
      <option value={"dsc"} selected>
        high to low
      </option>
      <option value={"asc"}>low to high</option>
    </select>
  );
}

export default SortByPrice;

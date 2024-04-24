import React from "react";
import SearchInput from "../../core/components/inputs/SearchInput";
import { findPlaces } from "../../core/services/WeatherForecast";
import useWeatherContext from "../../stores/weather/hook";
import NavbarTitle from "./NavbarTitle";

export default function Navbar() {
  const [search, setSearch] = React.useState("");
  const { dispatch } = useWeatherContext();

  const findPlacesAsync = async () => {
    try {
      const data = await findPlaces(search);
      if (data.list.length > 0) {
        dispatch({ type: "SET_PLACE", payload: data.list[0] });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSearch = async () => {
    await findPlacesAsync();
  };

  return (
    <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-[80px] flex justify-between items-center">
        <NavbarTitle />
        <SearchInput value={search} onChange={setSearch} onSearch={onSearch} />
      </div>
    </nav>
  );
}

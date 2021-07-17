import { useEffect, useState } from "react";
import {
  ChracterCard,
  Dropdown,
  Pager,
  NoResult,
} from "../../components/index";
import { generateQueryString } from "../../helpers/stringHelper";
import { getAllChracters } from "../../services/ApiService";
import "./style.css";

const genderOptions = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
  { text: "Genderless", value: "genderless" },
  { text: "Unknown", value: "unknown" },
];
const statusOptions = [
  { text: "Alive", value: "alive" },
  { text: "Dead", value: "dead" },
  { text: "Unknown", value: "unknown" },
];

const ChracterList = () => {
  const [chracters, setChracters] = useState([]);
  const [totalPageCount, setTotalPages] = useState(0);
  const [filterParameters, setFilterParameters] = useState([]);
  const [refreshPager, setRefreshPager] = useState(1);

  useEffect(async () => {
    getChracters();
  }, []);

  const getChracters = async (queryString = "") => {
    let response = await getAllChracters(queryString);

    if (response) {
      setChracters(response.results);
      setTotalPages(response.info.pages);
    }
  };

  const onChangeFilterDropdown = (event) => {
    setParameters(event.target.name, event.target.value);
  };

  const setParameters = (key, value) => {
    let parameter = filterParameters.filter(
      (parameter) => parameter.key === key
    )[0];

    if (parameter != undefined) {
      parameter.value = value;
    } else {
      filterParameters.push({
        key: key,
        value: value,
      });
    }

    setFilterParameters(filterParameters);
  };

  const filter = async () => {
    let queryString = generateQueryString(filterParameters, false);
    await getChracters(queryString);
    setRefreshPager(refreshPager + 1);
  };

  const goToPage = async (page) => {
    setParameters("page", page);
    let queryString = generateQueryString(filterParameters, true);
    await getChracters(queryString);
  };

  return (
    <div className="chracter-list-wrapper">
      <fieldset className="chracter-filter main-fieldset">
        <legend>Filter</legend>
        <Dropdown
          name="gender"
          options={genderOptions}
          onChangeDropdown={onChangeFilterDropdown}
        />
        <Dropdown
          name="status"
          options={statusOptions}
          onChangeDropdown={onChangeFilterDropdown}
        />
        <button onClick={filter}>Filter</button>
      </fieldset>
      <fieldset className="chracter-list main-fieldset">
        <legend>Chracters</legend>
        <div className="chracter-card-list">
          {chracters.map((chracter) => (
            <ChracterCard chracter={chracter} key={chracter.id} />
          ))}
        </div>
        {totalPageCount > 1 ? (
          <Pager
            totalPageCount={totalPageCount}
            goToPage={goToPage}
            key={refreshPager}
          />
        ) : null}
        {chracters.length == 0 ? <NoResult /> : null}
      </fieldset>
    </div>
  );
};

export default ChracterList;

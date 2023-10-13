import React, { useEffect, useState,useMemo} from "react";
import axios from "axios";
import Sitedata from "../select/Sitedata";
import styles from "@/styles/youbike.module.css";
import Ar from "../ar/Ar";

export default function Youbike() {
  const [car, setCar] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(true); //全選
  const [selectCity, setSelectCity] = useState("");
  const [optionCity, setOptionCity] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSareas, setFilteredSareas] = useState([]);

  useEffect(() => {
    const tpipei = async () => {
      try {
        const tpipeiyoubike = await axios.get(
          "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
        );
        setCar(tpipeiyoubike.data);
      } catch (err) {
        console.log(err);
      }
    };
    tpipei();
  }, []);
  //將行政區不重覆列出來
  const uniqueSareas = [...new Set(car.map((station) => station.sarea))];
  //找到所有站點
  const snaValues = useMemo(() => car.map((station) => station.sna), [car]);


  useEffect(() => {
    if (searchTerm === "") {
      setFilteredSareas([]);
    } else {
      const newFilteredSareas = snaValues.filter((sna) =>
        sna.includes(searchTerm)
      );
      setFilteredSareas(newFilteredSareas);
    }
  }, [searchTerm, snaValues]);

  //全選的函數
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const newCheckedItems = {};
    const newOptionCity = [];

    uniqueSareas.forEach((sarea) => {
      newCheckedItems[sarea] = isChecked;
      if (isChecked) {
        newOptionCity.push(sarea);
      }
    });

    setCheckedItems(newCheckedItems);
    setOptionCity(newOptionCity);
  };

  const handleCheckboxChange = (event, sarea) => {
    const isChecked = event.target.checked;

    // 更新 checkedItems
    setCheckedItems((prevState) => ({
      ...prevState,
      [sarea]: isChecked,
    }));

    // 更新 selectedSareas
    if (isChecked) {
      setOptionCity((prevSareas) => [...prevSareas, sarea]);
    } else {
      setOptionCity((prevSareas) =>
        prevSareas.filter((area) => area !== sarea)
      );
    }
  };

  const handleCityChange = (city) => {
    setSelectCity(city);
    if (city === "台北市") {
      const allChecked = {};
      uniqueSareas.forEach((sarea) => {
        allChecked[sarea] = true;
      });
      setCheckedItems(allChecked);
      setSelectAll(true);
      setOptionCity(uniqueSareas);
    } else {
      setCheckedItems({});
      setSelectAll(false);
      setOptionCity([]);
    }
  };
  const filteredData = car.filter((station) =>
    optionCity.includes(station.sarea)
  );

  const handleDropdownClick = (sarea) => {
    setSearchTerm(sarea);
  };

  return (
    <>
    {/* <hr /> */}
     <div className={styles.bike}>
  <h4 className={styles.h4}>站點資訊</h4>
  <div className={styles.input}>
    <Sitedata onChange={handleCityChange} />
    <input
      className={`${styles.select} form-control`}
      type="text"
      placeholder="搜尋站點"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  {selectCity === "台北市" ? (
    <ul className={styles.autocompleteDropdown}>
      {filteredSareas.map((sna) => (
        <li key={sna} onClick={() => handleDropdownClick(sna)}>
          {sna}
        </li>
      ))}
    </ul>
  ) : null}

  {selectCity ? (
    selectCity === "台北市" ? (
      <div className={styles.all}>
      <p><input
          type="checkbox"
          id="all"
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
        <label htmlFor="all">全部勾選</label></p>
        <div className={styles.container}>
          <div className={styles.list}>
            {uniqueSareas.map((sarea) => (
              <p key={sarea}>
                <input
                  type="checkbox"
                  id={`checkbox-${sarea}`}
                  checked={checkedItems[sarea] || false}
                  onChange={(event) => handleCheckboxChange(event, sarea)}
                />
                <label htmlFor={`checkbox-${sarea}`}>{sarea}</label>
              </p>
            ))}
          </div>
          <div className={styles.imageContainer}>
            <img src="img/Frame.png" alt="" />
          </div>
        </div>
      </div>
    ) : (
      <div>沒有資料</div>
    )
  ) : null}
</div>

      <Ar data={filteredData} searchTerm={searchTerm} />
    </>
  );
}

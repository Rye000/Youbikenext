import React from "react";
import Table from "react-bootstrap/Table";
import styles from "@/styles/ar.module.css";

export default function Ar(props) {
  const { data, searchTerm } = props;

  // 根據 searchTerm 過濾站點名稱
  const filteredData = data.filter(station => station.sna.includes(searchTerm));

  return (
    <>
    <div className={styles.tableContainer}>
      <Table hover striped className={styles.table}>
        <thead className={styles.thall}>
          <tr>
            <th>縣市</th>
            <th>區域</th>
            <th>站點名稱</th>
            <th>可借車輛</th>
            <th>可還車位</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="5">請選擇有資料的選項或更改搜尋條件</td>
            </tr>
          ) : (
            filteredData.map((station) => (
              <tr key={station.sno}>
                <td>台北市</td>
                <td>{station.sarea}</td>
                <td>{station.sna}</td>
                <td className={styles.quantity}>{station.sbi}</td>
                <td className={styles.quantity}>{station.bemp}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      </div>
    </>
  );
}



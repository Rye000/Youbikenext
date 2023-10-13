import React from 'react'
import styles from '@/styles/Sitedata.module.css'

export default function Sitedata({ onChange }) {
    const handleChange =(e) =>{
        if(e.target.value ==="請選擇"){
            return
        }
        onChange(e.target.value)
    }
  return (
    <select className={ `${styles.select} form-select` } onChange={handleChange}>
    <option>請選擇</option>
    <option>台北市</option>
    <option>新北市</option>
    <option>台南市</option>
    <option>高雄市</option>
    <option>台中市</option>
    <option>其他</option>
    </select>
  )
}

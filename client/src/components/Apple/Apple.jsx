import React from 'react'
import style from './Apple.module.css'
import AppleItem from './AppleItem'

export default function Apple() {
  return (
    <div className={`${style.wrapper}`}>
      <div className={style.head}>
        <h3>Apple Center</h3>
        <a href="#">
          Xem tất cả
          <i className="fa fa-angle-double-right"></i>
        </a>
      </div>
      <div className={style.listItem}>
        <AppleItem />
        <AppleItem />
        <AppleItem />
        <AppleItem />
      </div>
    </div>
  )
}

import React from 'react'
import s from './loader.module.css'

const Preloader = () => {
    return (
        <div className={s.preloaderWrapper}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Preloader
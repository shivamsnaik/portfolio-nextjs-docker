import styles from '../styles/Navbar.module.css'
import button, { useEffect, useState } from 'react'
export default function Navbar({ children }) {

    const [init_status, setAppStartStatus] = useState(true)
    const [menu_toggle, toggleMenu] = useState(true)


    function menuClick(e) {
        e.preventDefault();
        setAppStartStatus(false)
        toggleMenu(!menu_toggle)
        console.log("Button Clicked")
    };

    function navMenuClicked(e){
        e.preventDefault();
        console.log('Menu Button Clicked')
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.content}>
                <div className={styles.navbar_menus}>
                    <div className={`site-title accent-font lightgrey-on-hover ${styles.menu_items}`}>
                        <p>Shivam Naik</p>
                    </div>
                </div>
                <div className={`${styles.navbar_links}`}>
                    <button onClick={menuClick} style={{padding:"5px"}} className={styles.logo}><img src="/menu-button.svg" alt="Menu" className={styles.logoimg}/></button>
                    <div className={menu_toggle?styles.link_items:styles.link_items_toggled}>
                        <div onClick={navMenuClicked}><p>Academics</p></div>
                        <div onClick={navMenuClicked}><p>Work</p></div>
                        <div onClick={navMenuClicked}><p>About</p></div>
                        <div onClick={navMenuClicked}><p>Resume</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
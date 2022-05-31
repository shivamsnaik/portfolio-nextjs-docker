import styles from '../styles/Navbar.module.css'
import button, { useEffect, useState } from 'react'
export default function Navbar({ children }) {

    const [menu_toggle, toggleMenu] = useState(false)

    useEffect(()=> {

    });

    function menuClick(e) {
        e.preventDefault();
        toggleMenu(!menu_toggle)
        console.log("Button Clicked")
    }

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
                    <div className={styles.link_items} style={{display: menu_toggle?'flex':'none'}}>
                        <div><a href="">Academics</a></div>
                        <div><a href="">Work</a></div>
                        <div><a href="">About</a></div>
                        <div><a href="">Resume</a></div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
} 
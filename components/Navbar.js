import styles from '../styles/Navbar.module.css'
import button, { useEffect, useState } from 'react'
import Link from 'next/link'
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
        e.currentTarget.c
        e.currentTarget.classList.toggle(styles.link_selected)
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
                        <nav><Link href="/academics" className={`flex-grow ${styles.navlink_item}`}>Academics</Link></nav>
                        <nav><Link href="/work" className={styles.navlink_item}>Work</Link></nav>
                        <nav><Link href="/about" className={styles.navlink_item}>About</Link></nav>
                        <nav><Link href="/resume" className={styles.navlink_item}>Resume</Link></nav>
                    </div>
                </div>
            </div>
        </div>
    );
} 
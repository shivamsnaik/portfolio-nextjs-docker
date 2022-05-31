import styles from '../styles/Navbar.module.css'

export default function Navbar({ children }) {

    return ( 
        <div className={styles.navbar}>
            <div className={styles.content}>
                <div className={styles.navbar_menus}>
                    <div className={`site-title accent-font lightgrey-on-hover ${styles.menu_items}`}>
                        <p>Shivam Naik</p>
                    </div>
                </div>
                <div className={`${styles.navbar_links}`}>
                    <div style={{display: "flex", padding: "0 4px 0 4px"}}>
                        <img src="/menu-button.svg" alt="Menu" className={styles.logo}/>
                        <div className={styles.link_items}>
                            <a href="">Academics</a>
                            <a href="">Work</a>
                            <a href="">About</a>
                            <a href="">Resume</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
} 
import Navbar from '../components/Navbar'
import styles from '../styles/Page.module.scss'

const Page = ({children}) => {

  const navbar_list = [
    ["Academics","/academics"],
    ["Work", "/work"],
    ["About", "/about"],
    ["Resume", "/resume"]
  ];
  
  return(
      <div style={{ backgroundColor: "white" }} className={styles.container}>
        <div style={{flex: "1"}}>
          <Navbar title="Shivam Naik" navbar_list = {navbar_list}/>
          <div className={styles.page_content}>
            {children}
          </div>
        </div>
        <footer className={styles.footer}>
            <p>Made with</p>
            <img src="/heart.svg" alt="Vercel Logo" className={styles.logo} />&ensp; <p>in Deutschland</p>

        </footer>
      </div>
  );
};

export default Page;


import Navbar from '../components/Navbar'
import styles from '../styles/Page.module.css'

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
          <Navbar navbar_list = {navbar_list}/>
          <div className={styles.page_content}>
            {children}
          </div>
        </div>
        <footer className={styles.footer}>
            Made with
            <img src="/heart.svg" alt="Vercel Logo" className={styles.logo} />&ensp; in Deutschland

        </footer>
      </div>
  );
};

export default Page;


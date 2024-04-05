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
      <div className={styles.container}>
        <div className={styles.sub_container}>
          <Navbar title="PfaffHack" navbar_list = {navbar_list}/>
          <div className={styles.content_wrapper}>
            <div className={styles.page_content}>
              {children}
            </div>
          </div>
          
        </div>
        <footer className={styles.footer}>
            <p>Made with</p>
            <img src="/heart.svg" alt="Vercel Logo" className={styles.logo} />&ensp; <p>by Shivam Naik</p>

        </footer>
      </div>
  );
};

export default Page;


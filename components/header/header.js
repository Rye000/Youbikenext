// import React from "react";
// import styles from '@/styles/header.module.css'
// import Link from "next/link";

// export default function Header() {
//   return <>
//   <div className={styles.header}>
//   <Link href={'/'}> <img className={styles.logo} src="img/logo.png" alt="logo"/></Link>

//   <ul className={styles.list}>
//     <li><Link href={'/explain'}>使用說明</Link></li>
//     <li><Link href={'/money'}>收費方式</Link></li>
//     <li><Link href={'/site'}>站點資訊</Link></li>
//     <li><Link href={'/new'}>最新消息</Link></li>
//     <li><Link href={'/activity'}>活動專區</Link></li>
//   </ul>
//   <Link href="" className={styles.logn}>登入</Link>
//   </div>
//   <hr className={styles.hr} />
//   </>;
// }
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "@/styles/header.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/router';

function OffcanvasExample() {
  const [header, setHeader] = useState("");
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <Navbar expand="lg" className=" mb-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img className={styles.logo} src="img/logo.png" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className={`${styles.rwdlist}`}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel" >
              <img className={styles.logo} src="img/logo.png" alt="logo" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.rwdright}>
            <Nav
              className={`${styles.list} justify-content-end flex-grow-1 pe-3`}
            >
              <Link
                href="/explain"
                
              >
                <p className={currentPath === "/explain" ? styles.clicklist : null}>
                  使用說明
                </p>
              </Link>
              <Link
                href="/money"
    
              >
                <p className={currentPath === "/money" ? styles.clicklist : null}>
                  收費方式
                </p>
              </Link>
              <Link
                href="/youbike"
                
              >
                <p className={currentPath === "/youbike" ? styles.clicklist : null}>
                  站點資訊
                </p>
              </Link>
              <Link
                href="/new"
               
              >
                <p className={currentPath === "/new" ? styles.clicklist : null}>
                  最新消息
                </p>
              </Link>
              <Link
                href="/activity"
              >
                <p className={currentPath === "/activity" ? styles.clicklist : null}>
                  活動專區
                </p>
              </Link>
              <Link href="" className={styles.logn}>
                登入
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;

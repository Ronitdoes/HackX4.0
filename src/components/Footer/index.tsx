"use client";

import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  if (pathname === "/stats") return null;

  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["hero-row"]}>
        <div className="flex flex-col items-start gap-4">
          <h2 className={styles["hero-headline"]}>
            <span className={styles.line}>Let's</span>
            <span className={styles.line}>create</span>
            <span className={`${styles.line} ${styles.future}`}>future</span>
            <span className={styles.line}>together</span>
          </h2>
          {/* Mobile contact block (visible only on mobile viewports) */}
          <div className={styles["contact-block-mobile"]}>
            <p className={styles["contact-us-label"]}>Contact us</p>
            <a className={styles["contact-email"]} href="mailto:hackxmuj@gmail.com">hackxmuj@gmail.com</a>
          </div>
        </div>

        <div className={styles["team-grid"]}>
          <div className={styles["team-card"]}>
            <p className={styles["team-name"]}>Aryan Verma</p>
            <p className={styles["team-phone"]}>+91 8287044755</p>
            <a className={styles["team-email"]} href="mailto:vermaryan1@gmail.com">vermaryan1@gmail.com</a>
          </div>
          <div className={styles["team-card"]}>
            <p className={styles["team-name"]}>Samaksh Gupta</p>
            <p className={styles["team-phone"]}>+91 9871340076</p>
            <a className={styles["team-email"]} href="mailto:samakshgupta04@gmail.com">samakshgupta04@gmail.com</a>
          </div>
          <div className={styles["team-card"]}>
            <p className={styles["team-name"]}>Tamanna Yadav</p>
            <p className={styles["team-phone"]}>+91 8860514740</p>
            <a className={styles["team-email"]} href="mailto:23yadav.tamanna@gmail.com">23yadav.tamanna@gmail.com</a>
          </div>
          <div className={styles["team-card"]}>
            <p className={styles["team-name"]}>Harshada Chandel</p>
            <p className={styles["team-phone"]}>+91 9821970872</p>
            <a className={styles["team-email"]} href="mailto:hcwork28@gmail.com">hcwork28@gmail.com</a>
          </div>
        </div>
      </div>

      <div className={styles["footer-bottom"]}>
        {/* Desktop contact block (hidden on mobile viewports) */}
        <div className={styles["contact-block-desktop"]}>
          <p className={styles["contact-us-label"]}>Contact us</p>
          <a className={styles["contact-email"]} href="mailto:hackxmuj@gmail.com">hackxmuj@gmail.com</a>
        </div>

        <div className={styles["footer-meta"]}>
          <div className={styles["social-links"]}>
            <a href="#facebook">Facebook</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#instagram">Instagram</a>
          </div>
          <p className={styles.copyright}>© <span className={styles.year}>{year || "2026"}</span> All rights reserved. MUJHACKX.</p>
        </div>
      </div>
    </footer>
  );
}

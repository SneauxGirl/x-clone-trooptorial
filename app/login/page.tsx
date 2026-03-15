"use client";

import { useState } from "react";
import styles from "./Login.module.scss";
import { PiXLogoBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import Link from "next/link";
import { GiToaster } from "react-icons/gi";
import Toast from "@/components/Toast";
import { collection, query, where, getDocs } from "firebase/firestore";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("testing123@fakemail.com");
  const [password, setPassword] = useState<string>("testing123");
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let loginEmail = email;

    //check for username if it doesn't look like an email
    if (!email.includes("@")) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("No account found with that username.");
        return;
      }
      loginEmail = snapshot.docs[0].data().email;
    }

    setError(null);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, password);
      setShowToast(true);
      router.push("/");
    } catch (error) {
      setError("Failed to login. Please check your email and password.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <PiXLogoBold className={`${styles.icon} ${styles.logo}`} />
        </div>
        <h1 className={styles.header}>Sign in to X</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            placeholder="Phone, email address or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={!email || !password}
          >
            Next
          </button>
        </form>
        <Link href="#forgotPassword" className={styles.forgotPassword}>
          Forgot password?
        </Link>
        <div className={styles.signupLink}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </div>
        {showToast && (
          <Toast
            message="Successfully signed in"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;

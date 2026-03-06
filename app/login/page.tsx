'use client'

import { useState } from "react";
import styles from "./Login.module.scss";
import { PiXLogoBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import Link from "next/link";
import { GiToaster } from "react-icons/gi";
import Toast from "@/components/Toast";

export const LoginPage = () => {
    const [email, setEmail] = useState<string>("testing@fakeemail.com"); //clear after testing
    const [password, setPassword] = useState<string>("test12345"); //clear after testing
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowToast(true);
            router.push("/");
        } catch(error) {
            setError("Failed to login. Please check your email and password.");
        }
    }

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
                        type="email"
                        placeholder="Phone, email address, or username"
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
                <Link href="#forgotPassword" className={styles.forgotPassword}>Forgot password?</Link>
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
    )
}

export default LoginPage;
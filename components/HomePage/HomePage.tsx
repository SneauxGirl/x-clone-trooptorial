' use client';

import RightSidebar from '../RightSidebar';
import styles from './HomePage.module.scss'

const HomePage = () => {
    return (
        <div className={styles.container}>
            <h1>HOME PAGE</h1>
            {/* Sidebar */}
            {/* MainContent */}
            <RightSidebar />
        </div>
    )
}

export default HomePage;
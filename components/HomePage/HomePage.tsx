' use client';

import Sidebar from '../Sidebar';
import RightSidebar from '../RightSidebar';
import styles from './HomePage.module.scss'
import MainContent from '../MainContent';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <MainContent />
            <RightSidebar />
        </div>
    )
}

export default HomePage;
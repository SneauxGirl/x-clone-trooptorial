' use client';

import Sidebar from '../Sidebar';
import RightSidebar from '../RightSidebar';
import styles from './HomePage.module.scss'
import MainContent from '../MainContent';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <Sidebar avatarUrl={'https://randomuser.me/api/portraits/women/30.jpg'}/>
            <MainContent />
            <RightSidebar />
        </div>
    )
}

export default HomePage;
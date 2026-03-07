' use client';

import Sidebar from '../Sidebar';
import RightSidebar from '../RightSidebar';
import styles from './HomePage.module.scss'

const HomePage = () => {
    return (
        <div className={styles.container}>
            <Sidebar avatarUrl={'https://randomuser.me/api/portraits/men/9.jpg'}/>
            {/* MainContent */}
            <RightSidebar />
        </div>
    )
}

export default HomePage;
import { FaSearch } from 'react-icons/fa';
import styles from './RightSidebar.module.scss'
import Link from 'next/link';

const RightSidebar = () => {

    return (
        <div className={styles.rightSidebar}>
            <div className={styles.searchBar}>
                <FaSearch className={styles.searchIcon} />
                <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                />
            </div>
            <div className={styles.upgradeBanner}>
                <div className={styles.upgradeContent}>
                <h2>Upgrade to Premium+</h2>
                <p>
                    Enjoy additional benefits, zero ads, and the largest reply
                    prioritization.
                </p>
                <button className={styles.upgradeButton}>Upgrade to Premium+</button>
                </div>
            </div>
            <div className={styles.trending}>
                <h2>
                Explore <span className={styles.betaTag}>Beta</span>
                </h2>
                <ul className={styles.trendingList}>{/*Fill with dummy data*/}
                <li>
                    <div className={styles.trendInfo}>
                    <span>CSS · 1 hour ago</span>
                    <h3>
                        Developer centers a div... in Chrome
                    </h3>
                    </div>
                </li>
                <li>
                    <div className={styles.trendInfo}>
                    <span>FutureTech · 2 hours ago</span>
                    <h3>
                        Internet Explorer: a vibe code revival?
                    </h3>
                    </div>
                </li>
                <li>
                    <div className={styles.trendInfo}>
                    <span>Performance · 90 minutes ago</span>
                    <h3>QA assigns critical bug fix on a Tuesday</h3>
                    </div>
                </li>
                <li>
                    <div className={styles.trendInfo}>
                    <span>DevTools · 4 hours ago</span>
                    <h3>
                        Console.log v Claude: The Great Debug Debate 
                    </h3>
                    </div>
                </li>
                </ul>
                <a className={styles.showMore} href="#ShowMore"> {/*expansion note, not scroll to*/}
                Show more
                </a>
            </div>
            <div className={styles.whoToFollow}>
                <h2>Who to follow</h2>
                <ul className={styles.followList}>{/*Fill with dummy data*/}
                <li>
                    <div className={styles.userInfo}>
                    <img
                        src="https://randomuser.me/api/portraits/men/67.jpg"
                        alt="chiller"
                    />
                    <div>
                        <h3>chiller</h3> {/*dummy data username*/}
                        <span>@chiller</span>
                    </div>
                    </div>
                    <button className={styles.followButton}>Follow</button>
                </li>
                <li>
                    <div className={styles.userInfo}>
                    <img
                        src="https://randomuser.me/api/portraits/men/45.jpg"
                        alt="John"
                    />
                    <div>
                        <h3>John</h3>
                        <span>@johnhasnobeard</span>
                    </div>
                    </div>
                    <button className={styles.followButton}>Follow</button>
                </li>
                <li>
                    <div className={styles.userInfo}>
                    <img
                        src="https://randomuser.me/api/portraits/women/2.jpg"
                        alt="Jo B"
                    />
                    <div>
                        <h3>Jo B</h3>
                        <span>@saas_boss</span>
                    </div>
                    </div>
                    <button className={styles.followButton}>Follow</button>
                </li>
                </ul>
                <a className={styles.showMore} href="#ShowMore"> {/*expansion note, not ID*/}
                Show more
                </a>
            </div>
            <div className={styles.footerLinks}> {/*expansion notes, not ID*/}
                <Link href="#TermsOfSErvice">Terms of Service</Link> · <Link href="#Privacy Policy">Privacy Policy</Link> ·{" "}
                <Link href="#CookiePolicy">Cookie Policy</Link> · <Link href="#Accessibility">Accessibility</Link> ·{" "}
                <Link href="#AdsInfo">Ads info</Link> · <Link href="#More">More...</Link>
                <p>© 2024 X Corp.</p>
            </div>
        </div>
    );
}

export default RightSidebar;
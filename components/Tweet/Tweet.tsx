import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './Tweet.module.scss';
import { db } from '@/lib/firebaseConfig';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FiMoreHorizontal } from 'react-icons/fi';
import { PiSealCheckFill } from 'react-icons/pi';
import { FaRegComment, FaRetweet, FaHeart, FaRegHeart, FaChartBar, FaShare, FaTrash, FaUserCircle } from 'react-icons/fa';

interface TweetProps {
  tweetId: string;
  userId: string;
  avatarUrl: string | null;
  name: string;
  handle: string;
  time: string;
  content: string;
  comments: number;
  retweets: number;
  likes: number;
  onDelete: (tweetId: string) => void;
}

export const Tweet = ({
  tweetId,
  userId,
  avatarUrl,
  name,
  handle,
  time,
  content,
  comments,
  retweets,
  likes,
  onDelete,
}: TweetProps) => {
  const [commentCount, setCommentCount] = useState(comments || 0);
  const [retweetCount, setRetweetCount] = useState(Math.floor((Math.floor(Math.random() * 13010 + 1000) / 4)) * 4);
  const [likeCount, setLikeCount] = useState(Math.floor((Math.floor(Math.random() * 13010 + 1000) / 16)) * 16);
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();

const handleMenuToggle = () => setShowMenu(!showMenu);

//randomize engagement count... more or less
const [baseEngagement] = useState(
    Math.floor((Math.floor(Math.random() * 1302010 + 1000) / 16)) * 16
);

const [engagmentNum, setEngagementNum] = useState(baseEngagement);

  const handleLike = async () => {
    const newLikeCount = isLiked ? likeCount -1 :likeCount + 1;
    setIsLiked(!isLiked);
    setLikeCount(newLikeCount);
    setEngagementNum(engagmentNum+32)

    try {
      const tweetRef = doc(db, "tweets", tweetId);
      await updateDoc(tweetRef, {
        likes: newLikeCount,
      });
    } catch (error) {
      console.error("Failed to update likes:", error);
    }
  };

  const handleRetweet = async () => {
    const newRetweetCount = retweetCount + 1;
    setRetweetCount(newRetweetCount);
    setEngagementNum(engagmentNum+256)

    try {
      const tweetRef = doc(db, "tweets", tweetId);
      await updateDoc(tweetRef, {
        retweets: newRetweetCount,
      });
    } catch (error) {
      console.error("Failed to update retweets:", error);
    }
  };

  const handleComment = async () => {
    const newCommentCount = commentCount + 1;
    setCommentCount(newCommentCount);
    setEngagementNum(engagmentNum+64)

    try {
      const tweetRef = doc(db, "tweets", tweetId);
      await updateDoc(tweetRef, {
        comments: newCommentCount,
      });
    } catch (error) {
      console.error("Failed to update comments:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const tweetRef = doc(db, "tweets", tweetId);
      await deleteDoc(tweetRef); // Delete the tweet from Firebase
      onDelete(tweetId); // Pass the tweet ID to the parent component to remove it from state
    } catch (error) {
      console.error("Failed to delete tweet:", error);
    }
  };

    return (
    <div className={styles.tweet}>
      {avatarUrl ? (
      <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
      ) : (
        <FaUserCircle className={styles.avatar} />
      )}
      <div className={styles.tweetContent}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          <span className={styles.handle}>
            @{handle} <PiSealCheckFill className={styles.verifiedIcon} />
          </span>
          <span className={styles.time}> · {time}</span>
          {user?.uid === userId && (
          <FiMoreHorizontal
            className={styles.moreIcon}
            onClick={handleMenuToggle}
          />
          )}
          {user?.uid === userId && showMenu && (
            <div className={styles.menu}>
                {/*Functional*/}
              <div onClick={handleDelete} className={`${styles.menuItem} ${styles.redMenuItem}`}>
                Delete <FaTrash className={styles.icon} />
              </div>
              {/*Dummy tabs*/}
              <div className={styles.menuItem}>Unpin from profile</div>
              <div className={styles.menuItem}>Add/remove from Highlights</div>
              <div className={styles.menuItem}>
                Add/remove @{handle} from Lists
              </div>
              <div className={styles.menuItem}>Change who can reply</div>
              <div className={styles.menuItem}>View post engagements</div>
              <div className={styles.menuItem}>Embed post</div>
              <div className={styles.menuItem}>View post analytics</div>
              <div className={styles.menuItem}>Request Community Note</div>
            </div>
          )}
        </div>
        <div className={styles.body}>
          <p>{content}</p>
        </div>
        <div className={styles.actions}>
          <div className={styles.action} onClick={handleComment}>
            <FaRegComment className={styles.icon} />
            <span>{commentCount}</span>
          </div>
          <div className={styles.action} onClick={handleRetweet}>
            <FaRetweet className={styles.icon} />
            <span>{retweetCount}</span>
          </div>
          <div className={styles.action} onClick={handleLike}>
            {isLiked ? (
              <FaHeart className={`${styles.icon} ${styles.liked}`} />
            ) : (
              <FaRegHeart className={styles.icon} />
            )}
            <span>{likeCount}</span>
          </div>
          <div className={styles.action}>
            <FaChartBar className={styles.icon} />
            <span>
              {engagmentNum}
            </span>{" "}
          </div>
          <div className={styles.action}>
            <FaShare className={styles.icon} />
          </div>
        </div>
           </div>
      </div>
    )
}

export default Tweet;
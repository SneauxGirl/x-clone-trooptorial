"use client";

import { useEffect, useState } from "react";
import styles from "./MainContent.module.scss";
import { useAuth } from "@/context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import {
  FaBold,
  FaCalendarAlt,
  FaImage,
  FaItalic,
  FaMapMarkerAlt,
  FaPoll,
  FaSmile,
  FaUserCircle,
} from "react-icons/fa";
import Tweet from "@/components/Tweet";
import EmojiPicker from "emoji-picker-react";

const MainContent = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [newTweet, setNewTweet] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState("For you");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);

  //FETCH USER DATA
  useEffect(() => {
  if (user) {
    const fetchProfile = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        setFullName(userDoc.data().fullName);
        setUsername(userDoc.data().username);
      }
    };
    fetchProfile();
  }
}, [user]);

useEffect(() => {
    const fetchTweets = async () => {
      try {
        const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const tweetsData = await Promise.all(
          querySnapshot.docs.map(async (document) => {
            const data = document.data();
            const date = new Date(
              data.createdAt.seconds * 1000 +
                data.createdAt.nanoseconds / 1000000
            );

            const userDoc = await getDoc(doc(db, "users", data.userId));
            const userData = userDoc.exists() ? userDoc.data() : {};

            return {
              id: document.id,
              ...data,
              time: date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              authorName: userData.fullName || "User",
              authorHandle: userData.username || "guest",
              authorAvatar: userData.photoURL || null,
            };
          })
        );
        setTweets(tweetsData);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newTweet.length > 280) {
      setError("Tweet cannot exceed 280 characters");
      return;
    }

    if (newTweet.trim().length > 1 && user) {
      try {
        setIsSubmitting(true);
        const tweetData = {
          content: newTweet,
          userId: user.uid,
          createdAt: new Date(),
        };

        const docRef = await addDoc(collection(db, "tweets"), tweetData);
        const date = new Date();
        const newTweetData = {
          id: docRef.id,
          ...tweetData,
          time: date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          authorName: fullName,
          authorHandle: username,
          authorAvatar: userProfile?.photoURL || null,
        };

        setTweets([newTweetData, ...tweets]);
        setNewTweet("");
      } catch (error) {
        console.error("Error submitting tweet:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Tweet not submitted. Missing content or user.");
    }
  };

  const handleDeleteTweet = (tweetId: string) => {
    setTweets((prevTweets) =>
      prevTweets.filter((tweet) => tweet.id !== tweetId)
    );
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.topMenu}>
        {["For you", "Following", "SASS", "TypeScript", "LearnClaudeCode"].map(
          (menu) => (
            <button
              key={menu}
              className={`${styles.menuItem} ${
                activeMenu === menu ? styles.active : ""
              }`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </button>
          )
        )}
      </div>
      <form onSubmit={handleSubmit} className={styles.tweetInput}>
        <div className={styles.inputContainer}>
          {userProfile?.photoURL ? (
            <img src={userProfile.photoURL} alt="User" className={styles.profileImage} />
          ) : (
            <FaUserCircle className={styles.profileIcon} /> // Use the default icon if user is not logged in
          )}
          <textarea
            placeholder="What is happening?!"
            value={newTweet}
            onChange={(e) => {
              setNewTweet(e.target.value);
              if (e.target.value.length <= 280) setError("");
            }}
            className={styles.input}
            disabled={isSubmitting}
          />
          {showEmojiPicker && (
            <div className={styles.emojiPickerWrapper}>
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setNewTweet(newTweet + emojiData.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.iconsContainer}>
          <FaImage className={styles.icon} />
          <FaSmile
            className={styles.icon}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <FaPoll className={styles.icon} />
          <FaCalendarAlt className={styles.icon} />
          <FaMapMarkerAlt className={styles.icon} />
          <FaBold className={styles.icon} />
          <FaItalic className={styles.icon} />
          <span
            className={styles.charCount}
            style={{ color: newTweet.length > 260 ? "#f4212e" : "#b0b3b8" }}
          >
            {280 - newTweet.length}
          </span>
          <button
            type="submit"
            className={styles.postButton}
            disabled={
              isSubmitting ||
              newTweet.trim().length <= 1 ||
              newTweet.length > 280
            } // Disable if not typing, cap at 280
          >
            {isSubmitting ? "Submitting..." : "Post"}
          </button>
        </div>
      </form>
      <div className={styles.showPosts}>Show 105 posts</div>
      <div className={styles.feed}>
        {user ? (
          tweets.map((tweet) => (
            <div key={tweet.id} className={styles.tweet}>
              <Tweet
                tweetId={tweet.id}
                userId={tweet.userId}
                avatarUrl={tweet.authorAvatar}
                name={tweet.authorName}
                handle={tweet.authorHandle}
                time={tweet.time}
                content={tweet.content}
                comments={tweet.comments}
                retweets={tweet.retweets}
                likes={tweet.likes}
                onDelete={handleDeleteTweet} // Pass the handler function here
              />
            </div>
          ))
        ) : (
          <p className={styles.loginMessage}>Please log in to tweet.</p>
        )}
      </div>
    </div>
  );
};
export default MainContent;

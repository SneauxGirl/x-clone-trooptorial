import Link from "next/link";

export default function Home() {
  return (
      <main>
        <h1>Home Page</h1>
        <Link href='/signup'>Sign up</Link>
        <Link href='/login'>Login</Link>
      </main>
  );
}


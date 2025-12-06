import Link from "next/link";

export default function Header() {
  return (
    <header className="flex px-8 py-6 justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold">Tech Blog</h1>
      </Link>
    </header>
  );
}

import { Link } from "@chakra-ui/react";


export default function Navbar () {
  return (
    <nav className="flex justify-between items-center p-8">
      <div className="text-black font-bold text-lg">
        <Link href="/">BINGO</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <a href="/leaderboard">Leaderboard</a>
        </li>
      </ul>
    </nav>
  );
}
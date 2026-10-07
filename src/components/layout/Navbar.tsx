import { navigation } from "../../data/navigation";
import { profile } from "../../data/profile";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        {profile.initials}
        <span>.</span>
      </a>
      <nav>
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <Button href={profile.resume} variant="outline">
        Download Resume
      </Button>
    </header>
  );
}
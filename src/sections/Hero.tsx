import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section id="home" className="section">
      <h1>{profile.name}</h1>
      {profile.headline && <p>{profile.headline}</p>}
      {profile.intro && <p>{profile.intro}</p>}
    </section>
  );
}
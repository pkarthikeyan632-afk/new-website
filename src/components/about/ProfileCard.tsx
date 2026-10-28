import Image from "next/image";
import Link from "next/link";
import { AboutInfoIcon } from "@/components/shared/Icons";
import { about } from "@/content/about";
import { site } from "@/content/site";

export default function ProfileCard() {
  const role = about.info.find((item) => item.icon === "role");
  const location = about.info.find((item) => item.icon === "location");
  const education = about.info.find((item) => item.icon === "education");

  return (
    <section className="about-profile-card" aria-label="Profile">
      <div className="about-profile-photo">
        <Image src={about.photo} alt={site.name} fill priority sizes="(min-width: 1024px) 28vw, 100vw" />
      </div>

      <div className="about-profile-heading">
        <h2>{site.name}</h2>
        {role && (
          <p>
            {role.title}
            {role.detail && <><span aria-hidden="true"> · </span>{role.detail}</>}
          </p>
        )}
      </div>

      <div className="about-profile-details">
        {location && (
          <div className="about-profile-detail">
            <span className="about-profile-icon"><AboutInfoIcon name="location" /></span>
            <div>
              <p>{location.label}</p>
              <strong>{location.title}</strong>
              {location.detail && <span>{location.detail}</span>}
            </div>
          </div>
        )}
        {education && (
          <div className="about-profile-detail about-profile-education">
            <span className="about-profile-icon"><AboutInfoIcon name="education" /></span>
            <div>
              <p>{education.label}</p>
              <strong>{education.title}</strong>
              {education.detail && <span>{education.detail}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="about-profile-actions">
        <Link href={site.contactHref} className="about-profile-button about-profile-button-primary">
          LET&apos;S TALK
        </Link>
        {about.resumeHref !== "" && (
          <a href={about.resumeHref} className="about-profile-button about-profile-button-secondary">
            DOWNLOAD RESUME
          </a>
        )}
      </div>
    </section>
  );
}

import Image from "next/image";
import styles from "./ProjectPage.module.css";
import type { ProjectImage } from "@/content/projects";

export type AvailableProjectImage = { image: ProjectImage; exists: boolean; number: number };

type ProjectGalleryProps = { images: AvailableProjectImage[] };

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images.length) return null;
  const oneImage = images.length === 1;
  const production = process.env.NODE_ENV === "production";

  return (
    <div className={oneImage ? styles.gallerySingle : styles.galleryGrid}>
      {images.map(({ image, exists, number }) => (
        <figure className={styles.galleryFigure} key={`${image.src}-${number}`}>
          {exists ? (
            <a className={styles.galleryLink} href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${image.alt}`}>
              <div className={styles.galleryFrame}>
                {image.concept ? <span className={styles.conceptTag}>Concept, not real data</span> : null}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={oneImage ? "(max-width: 912px) 100vw, 880px" : "(max-width: 719px) 100vw, (max-width: 1100px) 50vw, 33vw"}
                  loading="lazy"
                  className={image.fit === "contain" ? styles.containImage : undefined}
                />
              </div>
            </a>
          ) : (
            <div className={styles.emptySlot}>Add image: public{image.src}</div>
          )}
          {image.caption.trim() && (!production || !image.caption.trimStart().startsWith("[PLACEHOLDER]")) ? <figcaption className={styles.galleryCaption}>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

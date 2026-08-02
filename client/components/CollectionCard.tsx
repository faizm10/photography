import Link from "next/link";
import { PhotoImage } from "@/components/PhotoImage";
import type { Collection, Photo } from "@/lib/photos";

interface CollectionCardProps {
  collection: Collection;
  cover: Photo;
  count: number;
  sizes: string;
}

/**
 * An album-style entry for a collection: a cover image with the collection
 * name, photo count, and an optional location beneath it.
 */
export function CollectionCard({ collection, cover, count, sizes }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-line-strong">
        <PhotoImage
          photo={cover}
          sizes={sizes}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg text-foreground">{collection.name}</h3>
        <span className="text-xs text-muted tabular-nums">
          {count} {count === 1 ? "photo" : "photos"}
        </span>
      </div>
      {collection.location && (
        <p className="mt-0.5 text-sm text-muted">{collection.location}</p>
      )}
    </Link>
  );
}

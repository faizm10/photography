import type { Metadata } from "next";
import { CollectionCard } from "@/components/CollectionCard";
import { Reveal } from "@/components/Reveal";
import {
  collections,
  getCollectionCount,
  getCollectionCover,
} from "@/lib/photos";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse photography by Faiz Mustansar, organised into collections — Toronto, Japan, street, landscapes, architecture, and night.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-3">Browse</p>
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
          Collections
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Bodies of work gathered by place and mood. Each is a small album —
          open one to view the full set.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
        {collections.map((collection, i) => (
          <Reveal as="div" key={collection.slug} delay={(i % 3) * 0.05}>
            <CollectionCard
              collection={collection}
              cover={getCollectionCover(collection.slug)}
              count={getCollectionCount(collection.slug)}
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

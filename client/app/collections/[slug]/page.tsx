import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PhotoGrid } from "@/components/PhotoGrid";
import {
  collections,
  getCollection,
  getPhotosByCollection,
} from "@/lib/photos";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};

  return {
    title: collection.name,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionPhotos = getPhotosByCollection(slug);
  const meta = [collection.location, collection.year].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/collections"
        className="group mb-10 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft
          size={15}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        All collections
      </Link>

      <header className="mb-12 max-w-2xl border-b border-line pb-8">
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
          {collection.name}
        </h1>
        {meta && <p className="mt-2 text-sm text-muted">{meta}</p>}
        <p className="mt-4 text-base leading-relaxed text-muted">
          {collection.description}
        </p>
        <p className="mt-4 text-xs text-muted tabular-nums">
          {collectionPhotos.length}{" "}
          {collectionPhotos.length === 1 ? "photograph" : "photographs"}
        </p>
      </header>

      <PhotoGrid photos={collectionPhotos} />
    </div>
  );
}

import { FilterableGallery } from "@/components/FilterableGallery";
import { collections, photos } from "@/lib/photos";

export default function Home() {
  return <FilterableGallery photos={photos} collections={collections} />;
}

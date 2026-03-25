import { SkeletonCard } from "@/components/i-skeletons/skeleton-card";


export default function ProductLoading() {
    return (
        <main className="container mx-auto">
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"> 
                {/* <SkeletonCard /> */}
                {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
      ))}
            </section>
        </main>
    )
}
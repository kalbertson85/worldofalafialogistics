import { Skeleton } from "@/components/ui/skeleton";

const ServicesGridSkeleton = () => {
  // Create an array of 6 skeleton items
  const skeletonItems = Array(6).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonItems.map((_, index) => (
        <div 
          key={index} 
          className="h-full p-6 bg-white rounded-xl shadow-sm border border-border flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <Skeleton className="w-16 h-6 rounded-full" />
          </div>
          
          <Skeleton className="h-6 w-3/4 mb-3" />
          <div className="space-y-2 flex-grow">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          
          <div className="mt-6 pt-4 border-t border-border/50">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesGridSkeleton;

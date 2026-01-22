export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-[9999]">
      <div className="flex gap-2">
        <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
        <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
        <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
      </div>
    </div>
  );
}



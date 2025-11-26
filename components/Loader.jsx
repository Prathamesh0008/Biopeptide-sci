//peptides\components\Loader.jsx
export default function Loader() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-10">
      <div className="animate-pulse w-8 h-1 bg-bioBlue"></div>
      <div className="animate-pulse w-8 h-1 bg-bioGreen"></div>
      <div className="animate-pulse w-8 h-1 bg-bioBlue"></div>
    </div>
  );
}

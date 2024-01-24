
type Props = {
  quantity: number
}

export default function PostSkeleton({quantity}: Props) {
  
  const elementArray = Array.from({ length: quantity }, (_, index) => index + 1);

  return (
    <>
      {elementArray.map((_element, index) => (
        <div key={index} className="flex flex-col justify-around text-white p-2 rounded-xl bg-slate-800 h-48">
        <div className="flex ">
          <div className="bg-slate-700 p-2 animate-pulse w-1/2"></div>
        </div>
        <hr className="my-1 animate-pulse"></hr>
        <div className="line-clamp-3 flex flex-col gap-2">
          <div className="bg-slate-700 p-2 animate-pulse"/>
          <div className="bg-slate-700 p-2 animate-pulse"/>
          <div className="bg-slate-700 p-2 animate-pulse"/>
        </div>
        <hr className="my-1 animate-pulse"></hr>
        <div className="flex justify-between text-sm">
          <div className="bg-slate-700 p-2 animate-pulse w-1/3"></div>
          <div className="bg-slate-700 p-2 animate-pulse w-1/3"></div>
        </div>
      </div>
      ))}
    </>
  );
}

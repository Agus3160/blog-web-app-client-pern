
type Props = {
  quantity: number
}

export default function PostSkeleton({quantity}: Props) {
  
  const elementArray = Array.from({ length: quantity }, (_, index) => index + 1);

  return (
    <>
    <div className="w-[300px] sm:w-[600px] grid grid-cols-1 content-center sm:grid-cols-2 gap-4 mx-auto ">
      {elementArray.map((_element, index) => (
        <div key={index} className="flex flex-col justify-around text-white p-2 rounded-xl bg-slate-800 ">
        <div className="bg-slate-700 rounded-xl h-40 w-full mb-4 animate-pulse"></div>
        <div className="flex ">
          <div className="bg-slate-700 p-2 mb-2 animate-pulse rounded-xl w-1/2"></div>
        </div>

        <div className="line-clamp-3 flex flex-col gap-2 my-2">
          <div className="bg-slate-700 p-2 rounded-xl animate-pulse"/>
          <div className="bg-slate-700 p-2 rounded-xl animate-pulse"/>
          <div className="bg-slate-700 p-2 rounded-xl animate-pulse"/>
        </div>
        <div className="flex justify-between">
          <div className="bg-slate-700 p-2 rounded-xl animate-pulse w-1/3"></div>
          <div className="bg-slate-700 p-2 rounded-xl animate-pulse w-1/3"></div>
        </div>
      </div>
      ))}
    </div>
    </>
  );
}

import { Trash2 } from "lucide-react";
import { CardProp } from "../../utils/types";
import { CustomText } from "../CustomText";

const PostCard = ({ post, title, onDelete, id }: CardProp) => {
  return (
    <div
      className="p-4 border border-gray-300 rounded-lg shadow-md w-full sm:w-auto h-52 sm:h-[293px] overflow-hidden bg-white flex flex-col"
      aria-labelledby="post-title"
    >
      <div className="flex items-center justify-end">
        <button
          onClick={() => onDelete(id)}
          className="z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Delete post"
          data-testid="delete-icon"
        >
          <Trash2 className="w-3 h-3  text-error" />
        </button>
      </div>

      <div className="flex flex-col h-full gap-2">
        <CustomText
          variant="textLarge"
          className="text-base sm:text-lg font-medium pr-8"
          id="post-title"
          as="h3"
        >
          {title}
        </CustomText>

        <div className="">
          <CustomText
            variant="textSm"
            className="line-clamp-6 text-sm leading-6 text-gray_600"
          >
            {post}
          </CustomText>
        </div>
      </div>
    </div>

    // <div
    //   className=" p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md w-full sm:w-auto h-52 sm:h-[293px] overflow-hidden bg-white flex flex-col"
    //   aria-labelledby="post-title"
    // >
    //   <div className="flex items-center justify-end">
    //     <button
    //       onClick={() => onDelete(id)}
    //       className=" top-3 right-3 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
    //       aria-label="Delete post"
    //       data-testid="delete-icon"
    //     >
    //       <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
    //     </button>
    //   </div>

    //   <div className="flex flex-col h-full gap-2">
    //     <CustomText
    //       variant="textLarge"
    //       className="text-base sm:text-lg font-medium pr-8"
    //       id="post-title"
    //       as="h3"
    //     >
    //       {title}
    //     </CustomText>

    //     <div className="flex-1 overflow-hidden">
    //       <div className="h-full pb-2 pr-2">
    //         <CustomText
    //           variant="textSm"
    //           className="text-xs sm:text-sm text-gray-700 leading-5 sm:leading-6 whitespace-pre-wrap"
    //           style={{
    //             display: "block",
    //             width: "100%",
    //             height: "100%",
    //             overflow: "hidden",
    //             textOverflow: "ellipsis",
    //           }}
    //         >
    //           {post}
    //         </CustomText>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export { PostCard };

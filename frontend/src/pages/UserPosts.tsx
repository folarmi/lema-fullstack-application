import { CustomText } from "../components/CustomText";
import leftArrow from "../assets/leftArrow.svg";
import { useLocation, useNavigate, useParams } from "react-router";
import { PostCard } from "../components/cards/PostCard";
import addCircle from "../assets/addCircle.svg";
import { Modal } from "../components/Modal";
import { useState } from "react";
import { NewPost } from "../components/modals/NewPost";
import { useGetData } from "../lib/apiCalls";
import { PaginationState } from "@tanstack/react-table";
import { PaginatedUsersResponse, Post, User } from "../utils/types";
import { Loader } from "../components/Loader";
import { ConfirmDelete } from "../components/modals/ConfirmDelete";

const UserPosts = () => {
  const [newPost, setNewPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string>("");
  const [pagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 400,
  });

  const navigate = useNavigate();
  const { userId: rawUserId } = useParams();
  const userId = String(rawUserId);
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;

  const handleBack = () => {
    navigate("/", { state: { restorePage: fromPage } });
  };

  const { data: user } = useGetData<User>({
    url: `/users/${userId}`,
    queryKey: ["UserInfo", userId!],
  });

  const { data: posts, isLoading } = useGetData<PaginatedUsersResponse<Post>>({
    url: `/users/${userId}/posts?page=${pagination.pageIndex + 1}&limit=${
      pagination.pageSize
    }`,
    queryKey: ["UserPosts", userId, JSON.stringify(pagination)],
  });

  const toggleNewPost = () => {
    setNewPost(!newPost);
  };

  const toggleDeletePost = () => {
    setDeletePost(!deletePost);
  };

  const handleDeleteClick = (id: string) => {
    setPostIdToDelete(id);
    setDeletePost(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <main className="mx-auto w-full px-4 sm:px-6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-[60%] mt-8 sm:mt-16 lg:mt-24 xl:mt-32">
          <div className="flex items-center" onClick={handleBack}>
            <img
              src={leftArrow}
              aria-label="Previous Page"
              className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
            />
            <CustomText
              variant="textSemiBold"
              className="pl-2 text-sm sm:text-base"
            >
              Back to Users
            </CustomText>
          </div>

          <CustomText
            variant="displayXL"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-6"
          >
            {user?.name}
          </CustomText>

          <section className="mt-3 sm:mt-4">
            <CustomText variant="textSm" className="text-xs sm:text-sm">
              {user?.email}{" "}
              <span className="font-medium">• {posts?.total} Posts</span>
            </CustomText>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:my-6">
              <div
                onClick={toggleNewPost}
                className="w-full h-full border border-dashed border-gray_300 flex flex-col justify-center items-center rounded-lg cursor-pointer py-4"
              >
                <img src={addCircle} className="w-10 h-10 sm:w-12 sm:h-12" />
                <CustomText
                  variant="textSemiBold"
                  className="mt-2 text-sm sm:text-base"
                >
                  New Post
                </CustomText>
              </div>

              {posts?.data.map(({ id, title, body }) => (
                <PostCard
                  onDelete={handleDeleteClick}
                  post={body}
                  title={title}
                  key={id}
                  id={id}
                />
              ))}
            </div>
          </section>

          <Modal show={newPost} toggleModal={toggleNewPost}>
            <NewPost toggleModal={toggleNewPost} />
          </Modal>

          <Modal show={deletePost} toggleModal={toggleDeletePost}>
            <ConfirmDelete
              toggleModal={toggleDeletePost}
              postId={postIdToDelete}
            />
          </Modal>
        </main>
      )}
    </>
  );
};

export { UserPosts };

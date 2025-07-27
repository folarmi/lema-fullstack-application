import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../lib/apiCalls";
import { CustomButton } from "../CustomButton";
import { useParams } from "react-router";

type DeleteProp = {
  postId: string;
  toggleModal: () => void;
};

const ConfirmDelete = ({ toggleModal, postId }: DeleteProp) => {
  const queryClient = useQueryClient();
  const { userId: rawUserId } = useParams();

  const deletePostMutation = useCustomMutation({
    endpoint: (postId: string) => `/posts/${postId}`,
    method: "delete",
    successMessage: () => "Post deleted successfully!",
    errorMessage: () => "Failed to delete post",
    onSuccessCallback: () => {
      if (rawUserId !== undefined) {
        queryClient.invalidateQueries({
          queryKey: ["UserPosts"],
        });
        toggleModal();
      }
    },
  });

  const handleDelete = async () => {
    deletePostMutation.mutate(postId);
  };

  return (
    <div className="p-6 bg-white drop-shadow-custom rounded-lg">
      <p className="font-medium text-4xl text-gray_900 pb-6">Delete Post</p>

      <div className="text-base text-gray_700 mb-6">
        Are you sure you want to delete this post? This action cannot be undone.
      </div>

      <div className="flex justify-end gap-4 bg-white">
        <CustomButton
          className="cursor-pointer"
          onClick={() => handleDelete()}
          variant="danger"
          isLoading={deletePostMutation.isPending}
        >
          Delete
        </CustomButton>
        <CustomButton onClick={toggleModal} variant="secondary">
          Cancel
        </CustomButton>
      </div>
    </div>
  );
};

export { ConfirmDelete };

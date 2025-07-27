import { useForm } from "react-hook-form";
import {
  FormData,
  MAX_BODY_LENGTH,
  MAX_TITLE_LENGTH,
  PostProp,
} from "../../utils/types";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { useCustomMutation } from "../../lib/apiCalls";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const NewPost = ({ toggleModal }: PostProp) => {
  const { userId: rawUserId } = useParams();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const createPostMutation = useCustomMutation({
    endpoint: () => `/posts`,
    successMessage: () => "Post added successfully!",
    errorMessage: () => "Failed to post",
    onSuccessCallback: () => {
      if (rawUserId !== undefined) {
        queryClient.invalidateQueries({
          queryKey: ["UserPosts"],
        });
        toggleModal();
      }
    },
  });

  const submitForm = (data: FormData) => {
    const formData = {
      ...data,
      userId: rawUserId,
    };
    createPostMutation.mutate(formData);
  };

  return (
    <div className="p-6 bg-white w-full max-w-[679px] drop-shadow-custom rounded-lg">
      <p className="font-medium text-4xl text-gray_900 pb-6">New Post</p>

      <form
        className="flex flex-col gap-y-6"
        onSubmit={handleSubmit(submitForm)}
      >
        <CustomInput
          name="title"
          label="Post Title"
          placeholder="Give your post a title"
          control={control}
          rules={{
            required: "Post title is required",
            maxLength: {
              value: MAX_TITLE_LENGTH,
              message: `Title cannot exceed ${MAX_TITLE_LENGTH} characters`,
            },
          }}
        />
        <CustomInput
          label="Post Content"
          textarea
          placeholder="Write something mind-blowing"
          name="body"
          control={control}
          rules={{
            required: "Post content is required",
            maxLength: {
              value: MAX_BODY_LENGTH,
              message: `Content cannot exceed ${MAX_BODY_LENGTH} characters`,
            },
          }}
        />

        <div className="flex justify-end gap-4 bg-white">
          <CustomButton onClick={toggleModal} variant="secondary">
            Cancel
          </CustomButton>

          <CustomButton
            type="submit"
            isLoading={isSubmitting || createPostMutation.isPending}
          >
            Publish
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export { NewPost };

import { PostFragment } from "@/generated/graphql";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import VisibilitySensor from "react-visibility-sensor";

type PostCardContexteProps = { isVisible: boolean; post: PostFragment };

const PostCardContext = createContext<PostCardContexteProps>({
  isVisible: false,
  post: null,
});

export const PostCardContextProvider: FC<
  PropsWithChildren & {
    post: PostFragment;
  }
> = ({ post, ...props }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
      <PostCardContext.Provider
        value={{
          isVisible,
          post,
        }}
        {...props}
      />
    </VisibilitySensor>
  );
};

export const usePostCardContext = () => useContext(PostCardContext);

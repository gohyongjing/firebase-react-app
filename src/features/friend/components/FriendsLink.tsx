import { useCallback } from "react";
import { useNavigate } from "lib/reactRouterDom";
import { PATH_FRIENDS } from "routes";
import { PersonIcon } from "@radix-ui/react-icons";

export function FriendsLink() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(PATH_FRIENDS);
  }, [navigate]);

  return (
    <div onClick={handleClick} className="flex items-center gap-1 hover:cursor-pointer text-sm text-primary-2 dark:text-primary-3 hover hover:underline">
      <PersonIcon />
      <a>
        Friends
      </a>
    </div>
  );
}

import { Button } from "components/form";
import { AccessibleIcon, CaretLeftIcon } from "lib/radixUi";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "routes";

export function BackToDashboardButton() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(PATH_DASHBOARD);
  }, [navigate])

  return (
    <Button
      onClick={handleClick}
    >
      <AccessibleIcon.Root
        label="Back to dashboard"
      >
        <CaretLeftIcon />
      </AccessibleIcon.Root>
    </Button>
  );
}

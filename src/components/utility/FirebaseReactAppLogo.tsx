import { twMerge } from 'lib/tailwindMerge';
import { useCallback } from 'react';
import { useNavigate } from 'lib/reactRouterDom';
import { PATH_HOME } from 'routes';

type Props = {
  className?: string
}

const defaultClassName = 'hover:cursor-pointer';

export function FirebaseReactAppLogo({ className = '' }: Props) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(PATH_HOME);
  }, [navigate]);

  return (
    <b
      className={twMerge(defaultClassName, className)}
      onClick={handleClick}
    >
      <span
        className="rounded-l-full underline decoration-4 decoration-secondary-1 dark:bg-inherit dark:text-secondary-1 dark:no-underline"
      >
        firebase-
      </span>
      <span
        className="rounded-r-full underline decoration-4 decoration-primary-3 dark:bg-inherit dark:text-primary-3 dark:no-underline"
      >
        react-app
      </span>
    </b>
  );
}
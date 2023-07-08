import { twMerge } from 'lib/tailwindMerge';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from 'routes';

interface Props {
  className?: string
}

const defaultClassName = 'text-lg hover:cursor-pointer';

export function FirebaseReactAppLogo({ className = ''}: Props) {
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
        className="text-secondary-1"
      >
        firebase
      </span>
      -
      <span
        className="text-primary-2 dark:text-primary-3"
      >
        react-app
      </span>
    </b>
  );
}
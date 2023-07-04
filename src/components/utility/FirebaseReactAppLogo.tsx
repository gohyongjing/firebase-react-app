import { twMerge } from 'lib/tailwindMerge';

interface Props {
  className?: string
}

const defaultClassName = 'text-lg';

export function FirebaseReactAppLogo({ className = ''}: Props) {
  return (
    <b
      className={twMerge(defaultClassName, className)}
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
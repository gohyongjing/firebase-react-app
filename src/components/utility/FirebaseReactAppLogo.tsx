
interface Props {
  className?: string
}

const defaultClassName = 'text-lg ';

export function FirebaseReactAppLogo({ className = ''}: Props) {
  return (
    <b
      className={defaultClassName + className}
    >
      <span
        className="text-secondary-1"
      >
        firebase
      </span>
      -
      <span
        className="text-primary-2"
      >
        react-app
      </span>
    </b>
  );
}
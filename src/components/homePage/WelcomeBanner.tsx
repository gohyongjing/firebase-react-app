import { FirebaseReactAppLogo } from "components/utility";
import { twMerge } from 'lib/tailwindMerge'

type Props = {
  className?: string
}

const defaultClassName = 'text-center';

export function WelcomeBanner({ className = '' }: Props) {
  return (
    <div
      className={twMerge(defaultClassName, className)}
    >
      <b
        className="text-2xl"
      >
        Welcome to
      </b>
      <div
        className="my-5 text-center"
      >
        <FirebaseReactAppLogo
          className="text-4xl"
        />  
      </div> 
    </div>
  );
}
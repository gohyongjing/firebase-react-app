import { FirebaseReactAppLogo } from "components/utility";

interface Props {
  className?: string
}

export function WelcomeBanner({ className = '' }: Props) {
  return (
    <div
      className={'text-center ' + className}
    >
      <b
        className="text-xl"
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
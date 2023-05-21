import { PATH_LOG_IN, PATH_SIGN_UP } from "../app/App";

export default function Home() {

  return (
    <div>
      <a href={PATH_LOG_IN}>log In</a>
      <a href={PATH_SIGN_UP}>Sign Up</a>
    </div>
  );
}
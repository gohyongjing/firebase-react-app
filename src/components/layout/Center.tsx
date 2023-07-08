import { HTMLAttributes } from "react";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

const defaultClassName = "self-stretch flex flex-col justify-center items-center";

type Props = HTMLAttributes<HTMLDivElement>;

export function Center(props: Props) {
  return (
    <div {...mergeClassNameIntoProps(props, defaultClassName)} />
  );
};

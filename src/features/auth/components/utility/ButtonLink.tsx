import { Button } from "components/form";
import { ButtonHTMLAttributes, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

const defaultClassName = "w-1/2 m-2";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { href: string };

export function ButtonLink({ href, ...props }: Props) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

   return (
    <Button
      { ...mergeClassNameIntoProps(props, defaultClassName) }
      onClick={handleClick}
    >
      { props.children }
    </Button>
  ); 
}

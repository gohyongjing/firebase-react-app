import { Button } from "components/form";
import { useNavigate } from "lib/reactRouterDom";
import { ButtonHTMLAttributes, useCallback } from "react";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { to: string };

export function ButtonLink({ to, ...props }: Props) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(to);
  }, [to, navigate]);

   return (
    <Button
      { ...mergeClassNameIntoProps(props, 'wide') }
      onClick={handleClick}
    >
      { props.children }
    </Button>
  ); 
}

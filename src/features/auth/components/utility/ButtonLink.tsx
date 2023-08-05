import { LongButton } from "components/form";
import { useNavigate } from "lib/reactRouterDom";
import { ButtonHTMLAttributes, useCallback } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { href: string };

export function ButtonLink({ href, ...props }: Props) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

   return (
    <LongButton
      { ...props }
      onClick={handleClick}
    >
      { props.children }
    </LongButton>
  ); 
}

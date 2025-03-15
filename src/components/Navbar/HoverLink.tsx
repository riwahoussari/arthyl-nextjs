import { AnchorHTMLAttributes } from "react";
import Link, {LinkProps} from "next/link";

type HoverLinkProps =
  | ({ tag: "Link"; children: string } & LinkProps)
  | ({ tag: "a"; children: string } & AnchorHTMLAttributes<HTMLAnchorElement>);

export default function HoverLink({ tag, children, ...props }: HoverLinkProps) {
  if (tag === "Link") {
    const linkProps = props as LinkProps;
    return (
      <Link {...linkProps} className="group relative flex overflow-hidden">
        {/* Invisible placeholder to maintain height) */}
        <span className="opacity-0">
          {children.split("").map((letter, i) => (
            <span className={`inline-block`} key={i}>
              {letter}
            </span>
          ))}
        </span>

        {/* Text moves up & into view on hover */}
        <span className="absolute top-full">
          {children.split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block -rotate-x-90 duration-200 ease-in-out group-hover:translate-y-[-100%] group-hover:rotate-x-0"
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>

        {/* Text moves up & out of view on hover */}
        <span className="absolute bottom-0">
          {children.split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block delay-[10] duration-200 ease-in-out group-hover:-translate-y-[100%] group-hover:rotate-x-90"
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </Link>
    );
  } else if (tag === "a") {
    return (
      <a {...props} className="group relative flex overflow-hidden">
        {/* Invisible placeholder to maintain height) */}
        <span className="opacity-0">
          {children.split("").map((letter, i) => (
            <span key={i} className={`inline-block`}>
              {letter}
            </span>
          ))}
        </span>

        {/* Text moves up & into view on hover */}
        <span className="absolute top-full">
          {children.split("").map((letter, i) => (
            <span
              className="inline-block -rotate-x-90 duration-200 ease-in-out group-hover:translate-y-[-100%] group-hover:rotate-x-0"
              style={{ transitionDelay: `${i * 25}ms` }}
              key={i}
            >
              {letter}
            </span>
          ))}
        </span>

        {/* Text moves up & out of view on hover */}
        <span className="absolute bottom-0">
          {children.split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block delay-[10] duration-200 ease-in-out group-hover:-translate-y-[100%] group-hover:rotate-x-90"
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </a>
    );
  }
}

export function HoverLink1({ tag, children, ...props }: HoverLinkProps) {
  if (tag === "Link") {
    const linkProps = props as LinkProps;
    return (
      <Link {...linkProps} className="group relative flex overflow-hidden">
        {/* Invisible placeholder to maintain height) */}
        <span className="opacity-0">{children}</span>

        {/* Text moves up & into view on hover */}
        <span {...props} className="absolute top-full duration-200 ease-in-out group-hover:top-0">
          {children}
        </span>

        {/* Text moves up & out of view on hover */}
        <span {...props} className="absolute bottom-0 duration-200 ease-in-out group-hover:bottom-full">
          {children}
        </span>
      </Link>
    );
  } else if (tag === "a") {
    return (
      <a {...props} className="group relative flex overflow-hidden">
        {/* Invisible placeholder to maintain height) */}
        <span className="opacity-0">{children}</span>

        {/* Text moves up & into view on hover */}
        <span className="absolute top-full duration-200 ease-in-out group-hover:top-0">
          {children}
        </span>

        {/* Text moves up & out of view on hover */}
        <span className="absolute bottom-0 duration-200 ease-in-out group-hover:bottom-full">
          {children}
        </span>
      </a>
    );
  }
}

import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";

type CheckListItem = {
  title: string;
  body?: string;
};

type CheckListProps = {
  items: CheckListItem[];
  columns?: 1 | 2 | 3;
};

/** Two-column bullet grid with check glyphs. No borders, no shadows. */
export function CheckList({ items, columns = 2 }: CheckListProps) {
  const colClass =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "grid-cols-1";
  return (
    <ul className={`grid grid-cols-1 gap-x-10 gap-y-10 ${colClass}`}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.05}>
          <li className="flex items-start gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-electric-blue text-paper">
              <CheckIcon />
            </span>
            <div>
              <p className="font-sf-pro-display text-[19px] font-semibold leading-snug md:text-[20px]">
                {item.title}
              </p>
              {item.body && (
                <p className="mt-2 text-[17px] leading-[1.47] text-mid-gray">
                  {item.body}
                </p>
              )}
            </div>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

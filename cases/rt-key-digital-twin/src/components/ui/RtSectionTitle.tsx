export type RtSectionTitleRightSlot = "chevron" | "menu-share";

type RtSectionTitleProps = {
  title: string;
  rightSlot?: RtSectionTitleRightSlot;
};

export function RtSectionTitle({ title, rightSlot }: RtSectionTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-app-section font-semibold text-text-primary">
        {title}
      </h2>
      {rightSlot === "chevron" ? (
        <span className="text-lg text-primary">⌃</span>
      ) : null}
      {rightSlot === "menu-share" ? (
        <div className="flex items-center gap-md text-primary">
          <span className="text-base">⋮</span>
          <span className="text-base">⤴</span>
        </div>
      ) : null}
    </div>
  );
}

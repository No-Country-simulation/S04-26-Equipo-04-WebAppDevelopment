import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      priority?: boolean;
      fill?: boolean;
    },
  ) => {
    const imageProps = { ...props };
    delete imageProps.priority;
    delete imageProps.fill;
    return React.createElement("img", imageProps);
  },
}));

vi.mock("@phosphor-icons/react", () => {
  const makeIcon = (name: string) =>
    function Icon(props: React.SVGProps<SVGSVGElement>) {
      return React.createElement("svg", {
        "data-icon": name,
        viewBox: "0 0 24 24",
        ...props,
      });
    };

  return {
    ArrowBendDoubleUpRight: makeIcon("ArrowBendDoubleUpRight"),
    Compass: makeIcon("Compass"),
    Handshake: makeIcon("Handshake"),
    Pulse: makeIcon("Pulse"),
    ShieldCheck: makeIcon("ShieldCheck"),
    Sparkle: makeIcon("Sparkle"),
    GraduationCap: makeIcon("GraduationCap"),
    SuitcaseSimple: makeIcon("SuitcaseSimple"),
    Target: makeIcon("Target"),
    TrendDown: makeIcon("TrendDown"),
    UserFocus: makeIcon("UserFocus"),
    CheckCircle: makeIcon("CheckCircle"),
    Buildings: makeIcon("Buildings"),
  };
});

import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("muestra el titular principal de la landing del equipo", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", {
        name: /tu experiencia es tu mayor valor/i,
      }),
    ).toBeInTheDocument();
  });
});

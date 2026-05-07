import { render, screen } from "@testing-library/react";
import LandingMain from "./LandingMain";

describe("LandingMain", () => {
  it("muestra el titulo principal de la landing", () => {
    render(<LandingMain />);

    expect(
      screen.getByRole("heading", {
        name: /tu experiencia es tu mayor valor/i,
      }),
    ).toBeInTheDocument();
  });

  it("muestra los llamados a la accion principales", () => {
    render(<LandingMain />);

    expect(
      screen.getByRole("button", { name: /quiero potenciar mi perfil/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /empezar ahora gratis/i }),
    ).toBeInTheDocument();
  });
});

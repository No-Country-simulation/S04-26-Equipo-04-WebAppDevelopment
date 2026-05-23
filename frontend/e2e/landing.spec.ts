import { expect, test } from "@playwright/test";

test("la landing de Scarlet carga con hero ámbar", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /tu experiencia tiene más valor del que crees/i,
    }),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: /comenzar mi diagnóstico/i })).toBeVisible();
});

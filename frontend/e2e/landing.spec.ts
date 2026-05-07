import { expect, test } from "@playwright/test";

test("la landing principal carga con elementos clave", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /tu experiencia es tu mayor valor/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: /iniciar sesi[oó]n/i }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: /nuestra comunidad en cifras/i }),
  ).toBeVisible();
});

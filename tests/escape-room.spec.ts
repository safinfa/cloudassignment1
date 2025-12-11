import { test, expect } from "@playwright/test";

test("Escape room loads and starts game", async ({ page }) => {

  await page.goto("http://localhost:3000/escape_room");


  await expect(page.locator("text=⏱")).toBeVisible();


  await page.getByRole("button", { name: "Start Timer" }).click();

 
  const dot = page.locator("div.bg-red-500").first();
  await expect(dot).toBeVisible();


  await dot.click();


  await expect(page.locator("text=Escape Room Challenge")).toBeVisible();
});

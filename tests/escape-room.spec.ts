import { test, expect } from "@playwright/test";

test("Escape room loads and starts game", async ({ page }) => {
  // ✅ Go to escape room page
  await page.goto("http://localhost:3000/escape_room");

  // ✅ Timer should be visible
  await expect(page.locator("text=⏱")).toBeVisible();

  // ✅ Start the timer
  await page.getByRole("button", { name: "Start Timer" }).click();

  // ✅ First red dot should appear
  const dot = page.locator("div.bg-red-500").first();
  await expect(dot).toBeVisible();

  // ✅ Click the dot
  await dot.click();

  // ✅ Escape Room popup should appear
  await expect(page.locator("text=Escape Room Challenge")).toBeVisible();
});

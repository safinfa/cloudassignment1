import { test, expect } from "@playwright/test";

test("Escape API saves and returns results", async ({ request }) => {

  const postResponse = await request.post("/api/escape", {
    data: {
      result: "WIN",
      timeTaken: 42,
    },
  });

  expect(postResponse.status()).toBe(201);

  const postData = await postResponse.json();
  expect(postData.result).toBe("WIN");
  expect(postData.timeTaken).toBe(42);


  const getResponse = await request.get("/api/escape");
  expect(getResponse.status()).toBe(200);

  const results = await getResponse.json();


  const found = results.find((r: any) => r.timeTaken === 42);
  expect(found).toBeTruthy();
});

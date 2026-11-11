/**
 * Wallpaper badge export resolution regression test.
 *
 * The badge used to rasterize at its native 320x240, where the whole layout
 * runs at scale 0.24 (~11px text, ~3px contribution cells). Any view larger
 * than 100% upscaled it into blur. Badges now export supersampled at 3x,
 * matching the Devémon card export.
 */
import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const avatarPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64"
);

async function mockGitHubProfile(page: Page) {
  await page.route("**/users/octocat", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        login: "octocat",
        avatar_url: "http://localhost:4321/avatar.png",
        name: "The Octocat",
        followers: 1234,
        public_repos: 42,
        bio: "GitHub mascot",
        created_at: "2011-01-25T18:44:36Z",
        company: "@github",
        location: "San Francisco",
        blog: "https://github.com",
      }),
    });
  });

  await page.route("**/octocat.contribs", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        total_contributions: 1234,
        weeks: Array.from({ length: 53 }, () => ({
          contribution_days: Array.from({ length: 7 }, () => ({ count: 2 })),
        })),
      }),
    });
  });

  await page.route(
    "**/users/octocat/repos**",
    async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify([
          {
            stargazers_count: 10,
            forks_count: 5,
            language: "TypeScript",
          },
        ]),
      });
    }
  );

  await page.route("**/avatar.png", async (route) => {
    await route.fulfill({
      contentType: "image/png",
      body: avatarPng,
    });
  });
}

function readPngDimensions(buffer: Buffer) {
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

test("wallpaper badge download is supersampled, not native 320x240", async ({
  page,
}) => {
  await mockGitHubProfile(page);
  await page.goto("/");
  const usernameInput = page.getByLabel("GitHub Username");
  await usernameInput.fill("octocat");
  await page.getByRole("button", { name: "Generate" }).click();
  await expect(page.getByText("Your Wallpaper")).toBeVisible();

  // Export requires the avatar to be converted to base64 first.
  await page.waitForFunction(() => {
    const image = document.querySelector("svg image");
    return Boolean(image?.getAttribute("href")?.startsWith("data:"));
  });

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /badge/i }).click(),
  ]);

  const badgePath = test.info().outputPath("wallpaper-badge.png");
  await download.saveAs(badgePath);

  const { width, height } = readPngDimensions(await readFile(badgePath));

  expect(width).toBe(960);
  expect(height).toBe(720);
});

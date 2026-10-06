import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const dist = join(root, "dist");
const deployDir = join(root, ".deploy");
const branch = process.env.DEPLOY_BRANCH || "gh-pages";
const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME || "x-access-token";

function git(args, options = {}) {
  execFileSync("git", args, {
    cwd: options.cwd || root,
    stdio: "inherit",
    env: process.env
  });
}

function output(args, options = {}) {
  return execFileSync("git", args, {
    cwd: options.cwd || root,
    encoding: "utf8",
    env: process.env
  }).trim();
}

function withToken(remoteUrl) {
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN. Add a Jenkins credential and expose it as GITHUB_TOKEN.");
  }

  if (remoteUrl.startsWith("https://")) {
    const cleanUrl = remoteUrl.replace(/^https:\/\//, "");
    return `https://${encodeURIComponent(username)}:${encodeURIComponent(token)}@${cleanUrl}`;
  }

  throw new Error("Deploy script expects an HTTPS GitHub remote URL, for example https://github.com/user/repo.git");
}

await rm(deployDir, { recursive: true, force: true });
await mkdir(deployDir, { recursive: true });
await cp(dist, deployDir, { recursive: true });
await writeFile(join(deployDir, ".nojekyll"), "");

const remoteUrl = withToken(output(["remote", "get-url", "origin"]));

git(["init"], { cwd: deployDir });
git(["checkout", "-B", branch], { cwd: deployDir });
git(["config", "user.email", "jenkins@example.com"], { cwd: deployDir });
git(["config", "user.name", "Jenkins CI"], { cwd: deployDir });
git(["add", "."], { cwd: deployDir });
git(["commit", "-m", "Deploy from Jenkins"], { cwd: deployDir });
git(["push", "--force", remoteUrl, `${branch}:${branch}`], { cwd: deployDir });

console.log(`Deploy completed to ${branch}.`);

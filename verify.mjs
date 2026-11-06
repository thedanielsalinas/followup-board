import assert from "node:assert/strict";
import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("sequence.json", "utf8"));
const html = fs.readFileSync("index.html", "utf8");
const markdown = fs.readFileSync("sequence.md", "utf8");

assert.equal(data.branches.length, 6, "The roadmap must contain six branches");
assert.deepEqual(data.branches.map((branch) => branch.id), [1, 2, 3, 4, 5, 6]);

for (const branch of data.branches) {
  const touches = branch.phases.flatMap((phase) => phase.touches);
  const emails = touches.filter((touch) => touch.channel === "Email").length;
  const texts = touches.filter((touch) => touch.channel === "SMS").length;
  assert.equal(emails, branch.counts.emails, `Branch ${branch.id} email total is out of sync`);

  const statedTextMaximum = Number(String(branch.counts.texts).match(/\d+$/)?.[0]);
  assert.equal(texts, statedTextMaximum, `Branch ${branch.id} text total is out of sync`);
  assert.match(markdown, new RegExp(`Branch ${branch.id} · ${branch.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
}

const embeddedMatch = html.match(/<script type="application\/json" id="sequence-data">([\s\S]*?)<\/script>/);
assert.ok(embeddedMatch, "index.html must contain embedded sequence data");
assert.deepEqual(JSON.parse(embeddedMatch[1]), data, "Embedded HTML data must match sequence.json");
const executableScripts = [...html.matchAll(/<script(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g)];
assert.ok(executableScripts.length, "index.html must contain its interaction script");
for (const [, script] of executableScripts) new Function(script);
assert.doesNotMatch(markdown, /Lead replies.*restart/i, "Replies must pause instead of restarting a sequence");
assert.match(markdown, /only one branch at a time/i);
assert.match(markdown, /EOD\/Grokbot is authoritative/i);

console.log("Verified six branches, cadence totals, routing rules, and synchronized outputs");

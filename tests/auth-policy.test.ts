import { test } from "node:test";
import assert from "node:assert/strict";
import { canAccessAdmin, OWNER_ID } from "../src/lib/owner-policy";

test("only an unexpired owner session grants admin access", () => {
  const user = { id: OWNER_ID };
  const session = { userId: OWNER_ID, expiresAt: new Date("2100-01-01") };
  assert.equal(canAccessAdmin(session, user), true);
  assert.equal(canAccessAdmin({ ...session, userId: "another-user" }, user), false);
  assert.equal(canAccessAdmin(session, { id: "another-user" }), false);
  assert.equal(canAccessAdmin({ ...session, expiresAt: new Date(0) }, user), false);
});

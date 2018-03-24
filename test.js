const test = require("ava");
const request = require("supertest");

const server = require("./index");

test("status code 200", async t => {
  const res = await request(server).get(
    "/anfrage/verfahren-fur-warnungen-vor-schlechter-luftqualitat/"
  );
  t.is(res.status, 200);
});

test("correct id", async t => {
  const res = await request(server).get(
    "/anfrage/verfahren-fur-warnungen-vor-schlechter-luftqualitat/"
  );
  t.is(res.body, 26522);
});

test("impossible slug", async t => {
  const res = await request(server).get("/anfrage/xxxaaayyy/");
  t.is(res.status, 400);
});

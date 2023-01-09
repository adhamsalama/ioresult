import ioresult from "./index";

async function start() {
  await success();
  await failure();
}
async function success() {
  let result = await ioresult(fakeSuccesAsyncFunction());
  console.assert(result.ok === true);
  console.assert(result.val === "Some data");
}

async function failure() {
  let result = await ioresult(fakeFailingAsyncFunction());
  console.assert(result.ok === false);
  console.assert(result.val instanceof Error);
  console.assert(result.val.message === "An error occurred");
}

async function fakeSuccesAsyncFunction() {
  return Promise.resolve("Some data");
}

async function fakeFailingAsyncFunction() {
  return Promise.reject(new Error("An error occurred"));
}

start();

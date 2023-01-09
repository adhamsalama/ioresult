# ioresult

A package that makes handling async errors easier.

Instead of multiple try/catch blocks, use ioresult.


Instead of this:

```ts
try {
  let result1 = await someAsyncFunction();
}
catch (err) {
  console.log("An error occurred", err);
  return null;
}
try {
  let result2 = await someOtherAsyncFunction(result1);
  return result2;
}
catch (err) {
  console.log("An error occurred", err);
  return null;
}
```

Or even worse:

```ts
try {
  let x = await someAsyncFunction();
  try {
    let y = await someOtherAsyncFunction(x);
    return y;
  }
  catch (err) {
    console.log("An error occurred", err);
    return null;
}
catch (err) {
  console.log("An error occurred", err);
    return null;
}
```

Do this:

```ts
import ioresult from "ioresult";

let result1 = await ioresult(someAsyncFunction());
if (!result1.ok) {
  console.log("An error occurred", result1.val);
  return null;
}
let result2 = await ioresult(someOtherAsyncFunction(result1.val));
if (!result2.ok) {
   console.log("An error occured", result2.val);
   return null;
}
return result2.val;
```

The result of ioresult is of type ```Result<T, Error>```, which is a bit similar to Rust.

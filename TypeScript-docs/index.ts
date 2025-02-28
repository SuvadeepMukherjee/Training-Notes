// function padLeft(padding: number | string, input: string): string {
//   if (typeof padding === "number") {
//     return " ".repeat(padding) + input;
//   }
//   return padding + input;
// }
// function multiplyAll(
//   values: number[] | undefined,
//   factor: number
// ): number[] | undefined {
//   if (!values) {
//     return values;
//   } else {
//     return values.map((x) => x * factor);
//   }
// }
// console.log(padLeft(2, "abc")); // "  abc"
// function printAll(strs: string | string[] | null) {
//   // !!!!!!!!!!!!!!!!
//   //  DON'T DO THIS!
//   //   KEEP READING
//   // !!!!!!!!!!!!!!!!
//   if (strs) {
//     if (typeof strs === "object") {
//       for (const s of strs) {
//         console.log(s);
//       }
//     } else if (typeof strs === "string") {
//       console.log(strs);
//     }
//   }
// }
// printAll(["Hello", "World"]); // "Hello", "World"
// printAll("Goodbye"); // "Goodbye"

// type Fish = { swim: () => void };
// type Bird = { fly: () => void };

// function move(animal: Fish | Bird) {
//   if ("swim" in animal) {
//     return animal.swim();
//   }

//   return animal.fly();
// }
// type Fish = { swim: () => void };
// type Bird = { fly: () => void };
// type Human = { swim?: () => void; fly?: () => void };

// function move(animal: Fish | Bird | Human) {
//   if ("swim" in animal) {
//     animal;
//   } else {
//     animal;
//   }
// }
// function logValue(x: Date | string) {
//   if (x instanceof Date) {
//     console.log(x.toUTCString());
//   } else {
//     console.log(x.toUpperCase());
//   }
// }

// let x = Math.random() < 0.5 ? 10 : "hello world!";

// x = 1;

// console.log(x);

// x = "goodbye!";

// console.log(x);
// let x = Math.random() < 0.5 ? 10 : "hello world!";

// x = 1;

// console.log(x);

// x = true;

// console.log(x);

// function padLeft(padding: number | string, input: string) {
//   if (typeof padding === "number") {
//     return " ".repeat(padding) + input;
//   }
//   return padding + input;
// }

// function example() {
//   let x: string | number | boolean;

//   x = Math.random() < 0.5;

//   console.log(x);

//   //   let x: boolean

//   if (Math.random() < 0.5) {
//     x = "hello";
//     console.log(x);

//     //   let x: string
//   } else {
//     x = 100;
//     console.log(x);

//     //   let x: number
//   }

//   return x;

//   //   let x: string | number
// }

// interface Fish {
//   swim: () => void;
// }

// interface Bird {
//   fly: () => void;
// }

// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined;
// }

// function greeter(fn: (a: string) => void) {
//   fn("Hello, World");
// }

// function printToConsole(s: string) {
//   console.log(s);
// }

// greeter(printToConsole);

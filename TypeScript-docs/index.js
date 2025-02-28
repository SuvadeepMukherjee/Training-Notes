// function padLeft(padding, input) {
//     if (typeof padding === "number") {
//         return " ".repeat(padding) + input;
//     }
//     return padding + input;
// }
// function multiplyAll(values, factor) {
//     if (!values) {
//         return values;
//     }
//     else {
//         return values.map(function (x) { return x * factor; });
//     }
// }
// console.log(padLeft(2, "abc")); // "  abc"
// function printAll(strs) {
//     // !!!!!!!!!!!!!!!!
//     //  DON'T DO THIS!
//     //   KEEP READING
//     // !!!!!!!!!!!!!!!!
//     if (strs) {
//         if (typeof strs === "object") {
//             for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
//                 var s = strs_1[_i];
//                 console.log(s);
//             }
//         }
//         else if (typeof strs === "string") {
//             console.log(strs);
//         }
//     }
// }
// printAll(["Hello", "World"]); // "Hello", "World"
// printAll("Goodbye"); // "Goodbye"

}
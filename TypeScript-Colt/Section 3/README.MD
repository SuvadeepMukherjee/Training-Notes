# Type Annotation Basics

#### Variable Types

Assigning a basic type to a variable is easy - just add:Type after the variable name (Also called Type Annotation)

```ts
const myAwesomeVariable: string = "So Awesome";
```

#### Strings

Strings represent character values like "I love TypeScript!"

We can tell TypeScript that something is a string using the type annotation of string(all lowercase)

```ts
let myString: string = "Words!!";
```

#### Numbers

Numbers can be typed with a simple type annotation of number (all lowercase)

```ts
let myNumber:number=42;
```

#### Booleans

Booleans can be typed with a simple type annotation of boolean(all lowercase)

```ts
const myBoolean:boolean = true;
```

#### Type Inference

Type Inference refers to the Typescript compilers ability to infer types from certain values in our code

Typescript can remember a values type even if we didnt provide a type annotation , and it will enforce that type moving forward

#### Any

"any" is an escape hatch! . It turns off type checking for this variable so we can do our thing

Note => It sorts of defeats the purpose of TS and types so use it sparingly 

```ts
let myComplicatedData: any = "I'm going to be complicated";

myComplicatedData = 87;

myComplicatedData = "abc";

myComplicatedData = true;
```

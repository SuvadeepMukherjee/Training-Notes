Syllabus

1. Installation
2. Type basics
3. Functions
4. Object Types
5. Array Types
6. Union Types
7. Tuples/Enums
8. Interfaces
9. TS Compiler
10. DOM Mini Project
11. JS Classes(Optional)
12. Generics
13. Narrowing
14. Declarations
15. Modules
16. Webpack _ TS (Optional)
17. React + TS (Optional)

#### What is TypeScript ?

**Answer**:Typescript is javascript with types

#### Why Types ?

**Answer**: TypeScripts Type systems allows us to

- Helps us find errors
- Analyses our code as we type
- Only exists in development

# Installation

To install typescript globally `npm install -g typescript`

To check the version of typescript `tsc -v`

Type Annotation Basics

# Variable Types

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

# Functions

#### Function Parameter types

In Typescript , we can specify the type of function parameters in a function defination. This allows TypeScript to enforce the types for the values being passed into our function.Typing parameters is just like typing variables

```ts
const encourageStudent = (name: string) => {

  return `Hey , ${name}, you're doing GREAT!!! `;

};
```

#### Working with Default parameters

```ts
const encourageStudent = (name: string = "stranger") => {

  return `Hey , ${name}, you're doing GREAT!!! `;

};
```

#### Return Type Annotations

We can specify the type returned by a function even though typescript can often infer this explicit annotation is preferred

Add the type annotation after the function parameter list

```ts
const addNums = (x: number, y: number): number => {

  return x + y;

};
```

#### Anonymous Functions

When Typescript can infer how an unnamed function is going to be called it can automatically infer its parameter types

```ts
numbers.forEach(num=>{

    return num.toUpperCase();

    //Error .toUpperCase() doesn't work for nums

})
```

#### Void

Void is a return type for functions that doesnt return anything . It means just that - this function is void of any data .

Typescript can infer this type fairly well , but sometimes it may want us to annotate a function with a void return explicitly

```ts
const annoyUser =(num:number):void=>{

    for(let i=0;i<num;i++){

        alert("HIII!")

    }

}
```

#### Never

The never type respresents values that NEVER occur . We might use it to annotate a function that always throw an exception , or a function that never finishes executing.

void returns undefined or null , which is technically still a type of value .With never , a function doesnt even finish executing

# Object Types

Objects can be typed by declaring what the object should look like in annotation

Accessing a property that isnt defined or performing operations without keeping types in mind will throw error

```ts
//A function with an object type parameter

const printName = (name: { first: string; last: string }) => {

  return `Name : ${name.first}${name.last}`;

};

printName({ first: "John", last: "Doe" });
```

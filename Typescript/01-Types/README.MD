# What is TypeScript ?

TypeScript code is a *superset* of JavaScript code—it has all the features of traditional JavaScript but adds some new features.

How to use TypeScript :

- First, we write TypeScript code in files with the extension **.ts**.
- Next, we run our code through the TypeScript [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). The transpiler will check that the code adheres to TypeScript’s standards, and it will display errors when it does not.
- If the TypeScript code can be converted into working JavaScript, the transpiler will output a JavaScript version of the file (**.js**).

# Type Inferences

When we declare a variable with an initial value, the variable can never be reassigned a value of a different data type. This is an example of *type inference*: everywhere in our program, TypeScript expects the data type of the variable to match the type of the value initially assigned to it at declaration.

TypeScript recognizes JavaScript’s built-in “primitive” data types:

- boolean
- number
- null
- string
- undefined

If we try to reassign a variable to a value of a different type, TypeScript will surface an error.

# Type Shapes

Because TypeScript knows what *types* our objects are, it also knows what *shapes* our objects adhere to. An object’s shape describes, among other things, what properties and methods it does or doesn’t contain.

The built-in types in JavaScript each have known properties and methods that always exist. All `string`s, for example, are known to have a `.length` property and `.toLowerCase()` method.

TypeScript’s `tsc` command will let you know if your code tries to access properties and methods that don’t exist

Through this knowledge of type shapes, TypeScript helps us quickly locate bugs in our code.

# Any

There are some places where TypeScript will not try to infer what type something is—generally when a variable is declared without being assigned an initial value. In situations where it isn’t able to infer a type, TypeScript will consider a variable to be of type `any`.

Variables of type `any` can be assigned to *any* value and TypeScript won’t give an error if they’re reassigned to a different type later on.

```ts
let onOrOff;  

onOrOff = 1;  
onOrOff = false;
```

In the code above, we declared the variable `onOrOff` without an initial value. TypeScript considers it to be of type `any`, and, therefore, doesn’t produce an error when we change the variable’s assignment from a `number` value to a `boolean` value.

# Variable Type Annotations

In some situations, we’d like to declare a variable without an initial value while still ensuring that it will only ever be assigned values of a certain type. If left as `any`, TypeScript won’t be able to protect us from accidentally assigning a variable to an incorrect type that could break our code.

We can tell TypeScript what type something is or will be by using a *type annotation*.

Variables can have *type annotations* (also known as type declarations) added just after their names. We provide a type annotation by appending a variable with a colon (`:`) and the type (e.g., `number`, `string`, or `any`).

```ts
let mustBeAString : string;
mustBeAString = 'Catdog';

mustBeAString = 1337;
// Error: Type 'number' is not assignable to type 'string'
```

In the code above, we explicitly declare `mustBeAString` to be of type `string` without assigning it an initial value. This enables us to assign it the value `'Catdog'` without complaint, but when we later attempt to assign it a numerical value, TypeScript will give us an error message telling us that a `number` is being improperly assigned to a variable of type `string`.

Some developers may find that type annotations make the code wordy or hard for others to understand, however, they get automatically removed when compiled to JavaScript.

# tsconfig.json File

If we dont want the default rules that typescript doesnt want to enforce we can customize the tsconfig.json file 

#### Sample tsconfig.json

The **tsconfig.json** file is always placed in the root of your project and you can customize what rules you want the TypeScript compiler to enforce

```json
{  
  "compilerOptions": {  
    "target": "es2017",  
    "module": "commonjs",  
    "strictNullChecks": true  
  },  
  "include": ["**/*.ts"]  
}
```

In the JSON, there are several properties:

- `"compilerOptions"`, which is a nested object that contains the rules for the TypeScript compiler to enforce.
  - `"target"`, the value `"es2017"` means the project will be using the 2017 version of EcmaScript standards for JavaScript.
  - `"module"`, this project will be using `"commonjs"` syntax to import and export modules.
  - `"strictNullChecks"`, variables can only have `null` or `undefined` values if they are explicitly assigned those values.
- `"include"` that determines what files the compiler applies the rules to. In this case `["**/*.ts"]` means the compiler should check every single file that has a **.ts** extension.

#### Usage

Another neat addition is that by including a **tsconfig.json** file, you can now use the command `tsc` without any arguments in your terminal! The compiler will automatically recognize from your **tsconfig.json** file, what specific files to run on. You can still provide specific files like `tsc fileName.ts` if that’s the only file you want the compiler to check.

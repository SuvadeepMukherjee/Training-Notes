# Array Type Annotations

We put `[]` after the element type. In this code, `names` is an Array that can only contain `string`s:

```ts
let names: string[] = ['Danny', 'Samantha'];
```

An alternative method is to use the `Array<T>` syntax, where `T` stands for the type.

```ts
let names: Array<string> = ['Danny', 'Samantha'];
```

In the code above, the type, `T`, is `string`.

we get a type error if we try to assign an array of `number`s to a `string[]` variable:

```ts
let names: string[] = [1,2,3]; // Type Error!
```

TypeScript arrays, however, can also throw errors when elements of the wrong type are added:

```js
let names: string[] = ['Damien'];  
names.push(666) // Type Error!
```

# Multi-dimensional Arrays

```ts
let arr: string[][] = [['str1', 'str2'], ['more', 'strings']];
```

The empty array (`[]`) is compatible with any array type:

```ts
let names: string[] = []; // No type errors.
let numbers: number[] = []; // No type errors.
names.push('Isabella');  
numbers.push(30);
```

# Tuples

```ts
let ourTuple: [string, number, string, boolean] = ['Is', 7 , 'our favorite number?' , false];
```

In TypeScript, when an array is typed with elements of specific types, it’s called a *tuple*. The tuple above (`ourTuple`) contains the elements: `'Is'`, `7` , `'our favorite number?'` , `false` and the tuple has a type of `[string, number, string, boolean]`. Tuple types specify both the lengths and the orders of compatible tuples, and will cause an error if either of these conditions are not met:

```ts
let numbersTuple: [number, number, number] = [1,2,3,4]; // Type Error! numbersTuple should only have three elements.
let mixedTuple: [number, string, boolean] = ['hi', 3, true] // Type Error! The first elements should be a number, the second a string, and the third a boolean. 
```

As far as JavaScript is concerned, tuples act just like arrays. They both have `.length` properties. We can access (or change) the elements of both using `[index]`. But despite their similarities, tuples and arrays do not have compatible types within TypeScript. Specifically, we can’t assign an array to a tuple variable, even when the elements are of the correct type:

```ts
let tup: [string, string] = ['hi', 'bye'];
let arr: string[] = ['there','there'];
tup = ['there', 'there']; // No Errors.
tup = arr; // Type Error! An array cannot be assigned to a tuple.
```

# Array Type Inference

TypeScript can infer variable types from initial values and return statements. Even still, we may not know exactly what type inference to expect when dealing with arrays. For example:

```ts
let examAnswers= [true, false, false];
```

What is the type of `examAnswers`? It seems it could equally well be `boolean[]` or `[boolean, boolean, boolean]`. In reality, it is always the first of these, since this is the less restrictive type. This enables us to expand the array:

```ts
examAnswers[3] = true; // No type error.
```

Since tuples have fixed lengths, we wouldn’t be able to add additional boolean elements to a tuple:

```ts
let tupleOfExamAnswers: [boolean, boolean, boolean] = [true, false, false];  
tupleOfExamAnswers[3] = true; // Type error! The tuple only has 3 elements.
```

We also get the same kind of type inference when we use the `.concat()` method:

```ts
let tup: [number, number, number] = [1,2,3];
let concatResult = tup.concat([4,5,6]); // concatResult has the value [1,2,3,4,5,6].
```

In the code above, TypeScript infers the variable `concatResult` as an array of numbers, not a tuple.

# REST Parameters

Assigning types to rest parameters is similar to assigning types to arrays

. Here’s a rest parameter example without types:

```ts
function smush(firstString, ...otherStrings){  
  let output = firstString;  
  for(let i = 0; i < otherStrings.length; i++){  
    output = output.concat(otherStrings[i]);  
  }  
  return output;  
}
```

This function concatenates all of its arguments. For example, calling: `smush('hi ', 'there')` returns the value `'hi there'`.” The *rest parameter* `otherStrings` lets the function work with any number of parameters greater than zero:

```ts
smush('a','h','h','H','H','H','!','!'); // Returns: 'ahhHHH!!'.
```

Type annotations for a rest parameter are identical to type annotations for arrays. The function with a correctly typed rest parameter is then:

```ts
function smush(firstString, ...otherStrings: string[]){  
  /*rest of function*/  
}
```

With this change, TypeScript will treat `otherStrings` as an array of strings. This means that `smush(1,2,3)` will result in a type error because `[2,3]` is not an array of strings.

# Spread Syntax

TypeScript's tuples  pair beautifully with JavaScript’s spread syntax. This is most useful for function calls that use lots of arguments, like this

```ts
function gpsNavigate(startLatitudeDegrees:number, startLatitudeMinutes:number, startNorthOrSouth:string, startLongitudeDegrees: number, startLongitudeMinutes: number, startEastOrWest:string, endLatitudeDegrees:number, endLatitudeMinutes:number , endNorthOrSouth:string, endLongitudeDegrees: number, endLongitudeMinutes: number,  endEastOrWest:string) {  
  /* navigation subroutine here */  
}
```

The function call `gpsNavigate(40, 43.2, 'N', 73, 59.8, 'W', 25, 0, 'N', 71, 0, 'W')` calculates a route from the Codecademy offices in New York City (40 degrees 43.2 minutes north, 73 degrees 59.8 minutes west) to selected coordinates in the Bermuda Triangle

Instead, we can use tuple variables that represent the starting and ending coordinates:

```ts
let codecademyCoordinates: [number, number, string, number, number, string] = [40, 43.2, 'N', 73, 59.8, 'W'];
let bermudaTCoordinates: [number, number, string, number, number, string] = [25, 0 , 'N' , 71, 0, 'W'];
```

These tuple type annotations guarantee that the types of the elements will be valid function parameters for `gpsNavigate()`.

Now, we use JavaScript’s spread syntax to write a very readable function call:

```ts
gpsNavigate(...codecademyCoordinates, ...bermudaTCoordinates);
// And by the way, this makes the return trip really convenient to compute too:
gpsNavigate(...bermudaTCoordinates, ...codecademyCoordinates);
// If there is a return trip . . . 
```

# Enums

We use enums when we’d like to **enum**erate all the possible values that a variable could have. This is in contrast to most of the other types we have studied. A variable of the `string` type can have any string as a value; there are infinitely many possible strings, and it would be impossible to list them all. Similarly, a variable of the `boolean[]` type can have any array of booleans as its value; again, the possibilities are infinite.

```ts
enum Direction {  
  North,  
  South,  
  East,  
  West  
}
```

There are many situations when we might want to limit the possible values of a variable. For example, the code above defines the enum `Direction`, representing four compass directions: `Direction.North`, `Direction.South`, `Direction.East`, and `Direction.West`. Any other values, like `Direction.Southeast`, are not allowed. Check out the example below:

```ts
let whichWayToArcticOcean: Direction;  
whichWayToArcticOcean = Direction.North; // No type error.  
whichWayToArcticOcean = Direction.Southeast; // Type error: Southeast is not a valid value for the Direction enum.  
whichWayToArcticOcean = West; // Wrong syntax, we must use Direction.West instead.
```

As shown above, an enum type can be used in a type annotation like any other type.

Under the hood, TypeScript processes these kinds of enum types using `number`s. Enum values are assigned a numerical value according to their listed order. The first value is assigned a number of `0`, the second a number of `1`, and onwards

For example, if we set `whichWayToArticOcean = Direction.North`, then `whichWayToArticOcean == 0` evaluates to `true`. Furthermore, we can reassign `whichWayToArticOcean` to a number value, like `whichWayToArticOcean = 2`, and it does not raise a type error. This is because `Direction.North`, `Direction.South`, `Direction.East`, and `Direction.West` are equal to 0, 1, 2, and 3, respectively.

We can change the starting number, writing something like

```ts
enum Direction {
  North = 7,
  South,
  East,
  West
}
```

Here, `Direction.North`, `Direction.South`, `Direction.East`, and `Direction.West` are equal to 7, 8, 9, and 10, respectively.

We can also specify all numbers separately, if needed:

```ts
enum Direction {
  North = 8,
  South = 2,
  East = 6,
  West = 4
}
```

# String Enums vs Numeric Enums

TypeScript also allows us to use enums based on `string`s, referred to as *string enums*. They are defined very similarly:

```ts
enum DirectionNumber { North, South, East, West }
enum DirectionString { North = 'NORTH', South = 'SOUTH', East = 'EAST', West = 'WEST' }
```

With numeric enums, the numbers could be assigned automatically, but with string enums we must write the string explicitly, as shown above. Technically, any string will do: `North = 'JabberWocky'` is a valid value definition. However, it is much better to use the convention shown here (`North = 'NORTH'`), where the string value of the enum variable is just the capitalized form of the variable name. This way, error messages and logs will be much more informative.

We recommend to always use string enums because numeric enums allow for some behaviors that can let bugs sneak into our code. For example, numbers can be assigned directly to numeric enum variables:

```ts
let whichWayToAntarctica: DirectionNumber;  
whichWayToAntarctica = 1; // Valid TypeScript code.  
whichWayToAntarctica = DirectionNumber.South; // Valid, equivalent to the above line.
```

Strangely, even assigning arbitrary numbers, as in `whichWayToAntarctica = 943205`, will not lead to type errors.

String enums are *much* more strict. With string enums variables cannot be assigned to strings at all!

```ts
let whichWayToAntarctica: DirectionString;  
whichWayToAntarctica = '\ (•◡•) / Arbitrary String \ (•◡•) /'; // Type error!  
whichWayToAntarctica = 'SOUTH'; // STILL a type error!  
whichWayToAntarctica = DirectionString.South; // The only allowable way to do this.
```

# Object Types

TypeScript’s *object types* are extremely useful, as they allow us extremely fine-level control over variable types in our programs. They’re also the most common custom types, so we’ll have to understand them if we want to read other people’s programs.

Here’s a type annotation for an object meant to represent a person:

```ts
let aPerson: {name: string, age: number};
```

The type annotation looks like an object literal, but instead of values appearing after properties, we have types. Notice that the variable `aPerson` has yet to be assigned a value. Trying to assign a value to `aPerson` that doesn’t have `name` and `age` properties of the specified types will lead to a type error:

```ts
aPerson = {name: 'Aisle Nevertell', age: "wouldn't you like to know"}; // Type error: age property has the wrong type.
aPerson = {name: 'Kushim', yearsOld: 5000}; // Type error: no age property. 
aPerson = {name: 'User McCodecad', age: 22}; // Valid code. 
```

Above, in the case of Kushim, the object had properties of the correct types. Still, a type error was thrown because the properties didn’t have the correct names.

TypeScript places no restrictions on the types of an object’s properties. They can be enums,  arrays, and even other object types!

```ts
let aCompany: {  
  companyName: string,  
  boss: {name: string, age: number},  
  employees: {name: string, age: number}[],  
  employeeOfTheMonth: {name: string, age: number},    
  moneyEarned: number  
};
```

# Type Aliases

One great way to customize the types in our programs is to use *type aliases*. These are alternative type names that we choose for convenience. We use the format `type <alias name> = <type>`:

```ts
type MyString = string;  
let myVar: MyString = 'Hi'; // Valid code.
```

Coming up with alternate names for `string` may not be very useful, but this can be done with any type whatsoever. Type aliases are truly useful for referring to complicated types that need to be repeated, especially object types and tuple types. Recall our earlier company example:

```ts
let aCompany: {  
  companyName: string,  
  boss: { name: string, age: number },  
  employees: { name: string, age: number }[],  
  employeeOfTheMonth: { name: string, age: number },    
  moneyEarned: number  
};
```

There’s so much needless repetition here! (And the more times we repeat something, the more opportunity there is for typos.) This can be cleaned up with type aliases:

```ts
type Person = { name: string, age: number };  
let aCompany: {  
  companyName: string,  
  boss: Person,  
  employees: Person[],  
  employeeOfTheMonth: Person,    
  moneyEarned: number  
};
```

TypeScript aliases are nothing more than names. They have absolutely no influence over how types work. For example, the following code does not lead to type errors:

```ts
type MyString = string;  
type MyOtherString = string;  
let firstString: MyString = 'test';  
let secondString: MyOtherString = firstString; // Valid code.
```

The reason this works is that `MyString` and `MyOtherString` are not distinct types. They are just alternative names for the same thing.

# Function Types

In javascript functions can be assigned to variables

```js
let myFavoriteFunction = console.log; // Note the lack of parentheses.
myFavoriteFunction('Hello World'); // Prints: Hello World
```

One of the neat things about TypeScript is that we can precisely control the kinds of functions assignable to a variable. We do this using *function types*, which specify the argument types and return type of a function. Here’s an example of a function type that is only compatible with functions that take in two string arguments and return a number. 

```ts
type StringsToNumberFunction = (arg0: string, arg1: string) => number;
```

This syntax is just like arrow notation for functions, except instead of the return value we put the return type. In this case, the return type is `number`. Because this is just a type, we did not write the function body at all. A variable of type `StringsToNumberFunction` can be assigned any compatible function:

```ts
let myFunc: StringsToNumberFunction;  
myFunc = function(firstName: string, lastName: string) {  
  return firstName.length + lastName.length;  
};  

myFunc = function(whatever: string, blah: string) {  
  return whatever.length - blah.length;  
};  
// Neither of these assignments results in a type error.

```

As we can see above, it doesn’t matter what we name the function parameters, so long as they have the correct types (`string` and `string`). Therefore, it doesn’t matter what we name the parameters in the type annotation (above, we chose `arg0` and `arg1`).

There’s something **important** to remember here. We must never be tempted to omit the parameter names or the parentheses around the parameters in a function type annotation, even if there is only one parameter. This code will not run!

```ts
type StringToNumberFunction = (string)=>number; // NO
type StringToNumberFunction = arg: string=>number; // NO NO NO NO
```

Function types are most useful when applied to callback functions. With how common callback functions are, it’s useful to know how to type them appropriately. Let’s get some practice using function types with callback functions!

# Generic Types

TypeScript’s *generics* are ways to create collections of types (and typed functions, and more) that share certain formal similarities. These collections are parameterized by one or more type variables.

 Array type syntax `Array<T>` is generic because we can substitute any type (either pre-defined or custom) in the place of `T`. For example `Array<string>` is an array of strings.

Generics give us the power to define our own collections of object types. Here’s an example

```ts
type Family<T> = {
  parents: [T, T], mate: T, children: T[]
};
```

This code defines a collection of object types, with a different type for every value of `T`. The generic `Family<T>` cannot actually be used as a type in a type annotation. Instead, we must substitute `T` with some type of our choosing, for example `string`. Then, `Family<string>` is *exactly* the same as the object type given by setting `T` to `string`: `{parents:[string,string], mate:string, children: string[]}`. So the following assignment will be error free:

```ts
let aStringFamily: Family<string> = {  
  parents: ['stern string', 'nice string'],  
  mate: 'string next door',  
  children: ['stringy', 'stringo', 'stringina', 'stringolio']  
};
```

In general, writing generic types with `type typeName<T>` allows us to use `T` within the type annotation as a type placeholder. Later, when the generic type is used, `T` is replaced with the provided type. (Writing `T` is just a convention. We could just as easily use `S` or `GenericType`. )

# Generic Functions

We can also use generics to create collections of typed functions

```ts
function getFilledArray(value, n) {  
  return Array(n).fill(value);  
}
```

Here, `getFilledArray('cheese', 3)` evaluates to `['cheese', 'cheese', 'cheese']`. No problem, right? Well, we run into a problem when we try to specify the function’s return type. We know it should be an array of whatever `value`‘s type is—do we have to write a separate type annotation for every type of `value`? Nope. Here, we are rescued by generic functions!

```ts
function getFilledArray<T>(value: T, n: number): T[] {
  return Array(n).fill(value);
}
```

The above code tells TypeScript to make sure that `value` and the returned array have the same type `T`. When the function is invoked, we will provide `T`‘s value. For example, we can invoke the function using `getFilledArray<string>('cheese', 3)`, which sets `T` equal to `string`. This still evaluates to `['cheese', 'cheese', 'cheese']`, but the function is now correctly typed and less prone to errors. The function `getFilledArray<string>` is precisely the same as if we had written `(value: string, n: number): string[]` in its type annotation.

In general, writing generic functions with `function functionName<T>` allows us to use `T` within the type annotation as a type placeholder. Later, when the function is invoked, `T` is replaced with the provided type.

TypeScript allows us to be flexible with how specific our types are by combining different types. When we combine types, it is called a *union*.

# Defining Unions

Unions allow us to define multiple allowed *type members* by separating each type member with a vertical line character `|`

```ts
let ID: string | number;

// number
ID = 1;

// or string
ID = '001';

console.log(`The ID is ${ID}.`);

```

In this example, `string | number` is a union that allows `ID` to be a `string` or a `number`. It’s more flexible than a single primitive type, but much more specific than the `any` type.

Unions can be written anywhere a type value is defined, including function parameters:

```ts
function getMarginLeft(margin: string | number) {  
  return { 'marginLeft': margin };  
}
```

Using unions to type function parameters is especially convenient because 

functions often need to handle multiple types of input.

# Type Narrowing

```ts
function getMarginLeft(margin: string | number) {
  // ...
}
```

Since `margin` can be a `string` or a `number`, we may want to perform different logic in the `getMarginLeft()` function’s body that does one thing for strings and another for numbers. To do this, we could implement a *type guard*. A type guard is a conditional that checks if a variable is a certain type, like this:

```ts
function getMarginLeft(margin: string | number) {  
  // margin may be a string or number here  
    
  if (typeof margin === 'string') {  
    // margin must be a string here  
  }  
}
```

In the example above, TypeScript is able to read the type guard and infer that the `margin` variable inside the type guard must be a `string`. Since TypeScript knows `margin` is a `string`, it will allow us to use `string` methods on `margin`, like this:

```ts
if (typeof margin === 'string') {  
  return margin.toLowerCase();  
}
```

If we tried to call `margin.toLowerCase()` outside of the string type guard, TypeScript would complain that the `.toLowerCase()` method does not exist on `number` types. This error would occur because `margin` is typed as a `string | number` union.

This concept is called *type narrowing*. Type narrowing is when TypeScript can figure out what type a variable can be at a given point in our code. In our examples, TypeScript has narrowed the type inside the type guard to only be a `string`. Type narrowing allows us to use unions, then perform type-specific logic without TypeScript getting in the way.

# Inferred Union Return Types

TypeScript is  able to infer types in many cases so that we don’t have to manually write them. A great example is a function’s return type. TypeScript will look at the contents of a function and infer which types the function can return. If there are multiple possible return types, TypeScript will infer the return type as a union.

For instance, take this example, where we call a function named `getBookFromServer()`, which might fail:

```ts
function getBook() {
  try {
    return getBookFromServer();
  } catch (error) {
    return `Something went wrong: ${error}`;
  }
}
```

If the call is successful, the function will return a `Book` type describing a book. If the call fails, the function will return a `string`. `getBook()` can return a `Book` or `string` type, TypeScript infers the return type as the union `Book | string`. Since TypeScript can infer the function’s return type, there’s no need for us to manually define it.

# Unions and Arrays

Unions are even more powerful when used in combination with arrays

For instance, we can represent time in TypeScript with a number or a string type. If we had a list of dates in both types, we’d need an array that allows for string and number values. Unions are here to help.

To create a union that supports multiple types for an array’s values, wrap the union in parentheses `(string | number)`, then use array notation `[]`.

```ts
const dateNumber = new Date().getTime(); // returns a number  
const dateString = new Date().toString(); // returns a string  

const timesList: (string | number)[] = [dateNumber, dateString];

```

Above, the `timesList` variable is typed to allow `string` and `number` types as values in its array. If we try to add a value to `timesList` that is not either type, like with `timesList.push(true)`, TypeScript would display an error that `boolean` types are not allowed inside `timesList`.

One last thing: the parentheses are vitally important to type arrays correctly. If we left out the parentheses and wrote `string | number[]`, that type would allow strings *or* arrays of only numbers.

# Common Key Value Pairs

When we put type members in a union, TypeScript will only allow us to use the common methods and properties that all members of the union share

```ts
const batteryStatus: boolean | number = false;  

batteryStatus.toString(); // No TypeScript error  
batteryStatus.toFixed(2); // TypeScript error

```

Since `batteryStatus` can be a `boolean` or a `number`, TypeScript will only allow us to call methods that both `number` and `boolean` share. They both share `.toString()`, so we’re good there. But, since only `number` has a `.toFixed()` method, TypeScript will complain if we try to call it.

This rule also applies to type objects that we define

```ts
type Goose = {  
  isPettable: boolean;  
  hasFeathers: boolean;  
  canThwartAPicnic: boolean;  
}  

type Moose = {  
  isPettable: boolean;  
  hasHoofs: boolean;  
}  

const pettingZooAnimal: Goose | Moose = { isPettable: true };  

console.log(pettingZooAnimal.isPettable); // No TypeScript error  
console.log(pettingZooAnimal.hasHoofs); // TypeScript error

```

Like before, since `.isPettable` is on both `Goose` and `Moose` types, TypeScript will allow us to call it. But since `.hasHoofs` is only a property on `Moose`, we cannot call that method on `pettingZooAnimal`. Any properties or methods that are not shared by all of the union’s members won’t be allowed and will produce a TypeScript error.

# Unions with Literal Types

We can use literal types with TypeScript unions. Literal type unions are useful when we want to create distinct states within a program.

For instance, if we were writing the code that controlled stoplights, we might write a program like this:

```ts
type Color = 'green' | 'yellow' | 'red';  

function changeLight(color: Color) {  
  // ...  
}

```

With the code above, we could ensure that wherever `changeLight()` is called, that it gets passed only allowed stoplight colors. If we tried to call `changeLight('purple')`, TypeScript would complain, since that is not a valid stoplight color.

This technique allows us to write functions that are specific about the states they can handle, which helps us write code that’s less prone to errors.

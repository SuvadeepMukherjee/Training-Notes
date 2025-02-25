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

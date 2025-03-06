# Introduction

#### Testing

- As a developer ,our primary goal is to build software that works

- To ensure our software works ,we test the application

- We check if our software works as expected

#### Manual Testing

- An individual will open the website , interact with the website and ensure everything works as intended

- If a new feature is released , we repeat the same steps

- We may have to test not only the new feature but also the existing features

#### Drawbacks of Manual Testing

- Time Consuming

- Complex repetitive tasks has a risk of human error

- We may not get a chance to test all the features

#### Automated Testing

- Automated tests are programs that automate the task of testing our software

- Write code to test the software code

- Additional effort required when we develop a feature

#### Advantages of Automated Testing

- Not time consuming

- Reliable , consistent and not error prone

- Easy to identify and fix features that breaks tests

- Gives confidence when shipping software

#### Course Structure

- Jest and React Testing Library

- Fundamentals of writing a test

- Test components with user interactions

- Test components wrapped in a provider

- Test components with mocking

- Static analysis testing 

# Jest vs React Testing Library

#### Jest

- Jest is a javascript testing framework

- Jest is a test runner that finds tests ,runs the tests ,determines whether the tests passed or failed and reports it back in a human readable manner

#### React Testing Library

- Javascript testing utility that provides virtual DOM for testing React components

- React Testig Library provides a virtual DOM which we can use to interact with and verify the behavior of a react component

- Testing Library is a family of packages which helps test UI components

- The core Library is called DOM Testing library and RTL is simply a wrapper around this core libarry to test React applications in a easier way

# Types of Tests

There are 3 types of test 

- Unit tests

- Integration tests

- E2E tests

#### Unit Tests

- Focus is on testing the individual building blocks of an application such as a class or a function or a component

- Each unit or building block is tested in isolation , indepndent of other units

- Dependencies are mocked

- Run in a short amount of time and make it very easy to pinpoint failures

- Relatively easier to run and maintain

#### Integration tests

- Focus is on testing a combination of units and ensuring they work together

- Take longer than unit tests

#### E2E tests

- Focus is on testing the entire application flow and ensuring it works as designed from start to finish

- Involves a real UI , a real backend database ,real services etc

- Take the longest as they cover the most amount of code

- Have  a cost implication as we intercat with real APIs that may charge based on the number of requests

#### Testing Pyramid

![](./assets/testing-pyarmid.png)

#### RTL Philosophy

- The more your tests resembe the way our software is used , the more confidence they can give us

- With React Testing Library , we are not concerned about the implementation details of a component

- We are testing how the component behaves when a user interacts with it

- RTL will not care if we add 4+4 or 5+3 to display the number 8

- Refactoring will not affect our test as log as the end result is the same

- RTL strikes a balance between unit and E2E tests which is what we will be learning in the rest of the series





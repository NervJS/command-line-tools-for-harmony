---
Require consistent spacing around type annotations.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_type-annotation-spacing-{{apiVersion}}) for more details.

Spacing around type annotations improves readability of the code. Although the most commonly used style guideline for type annotations in TypeScript prescribes adding a space after the colon, but not before it, it is subjective to the preferences of a project. For example:

<!-- prettier-ignore -->
```ts
// with space after, but not before (default if no option is specified)
let foo: string = "bar";

// with no spaces
let foo:string = "bar";

// with space before and after
let foo : string = "bar";

// with space before, but not after
let foo :string = "bar";

// with spaces before and after the fat arrow (default if no option is specified)
type Foo = (string: name) => string;

// with no spaces between the fat arrow
type Foo = (string: name)=>string;

// with space after, but not before the fat arrow
type Foo = (string: name)=> string;

// with space before, but not after the fat arrow
type Foo = (string: name) =>string;
```

## Examples

This rule aims to enforce specific spacing patterns around type annotations and function types in type literals.

<!--tabs-->

### ❌ Incorrect

<!-- prettier-ignore -->
```ts
let foo:string = "bar";
let foo :string = "bar";
let foo : string = "bar";

function foo():string {}
function foo() :string {}
function foo() : string {}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

class Foo {
    name : string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = ()=> {};
```

### ✅ Correct

<!-- prettier-ignore -->
```ts
let foo: string = "bar";

function foo(): string {}

class Foo {
    name: string;
}

type Foo = () => {};
```

## Options

### after

```json
{ "before": false, "after": true }
```

<!--tabs-->

#### ❌ Incorrect

<!-- prettier-ignore -->
```ts option='{ "before": false, "after": true }'
let foo:string = "bar";
let foo :string = "bar";
let foo : string = "bar";

function foo():string {}
function foo() :string {}
function foo() : string {}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

class Foo {
    name : string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = () => {};
```

#### ✅ Correct

<!-- prettier-ignore -->
```ts option='{ "before": false, "after": true }'
let foo: string = "bar";

function foo(): string {}

class Foo {
    name: string;
}

type Foo = ()=> {};
```

### before

```json
{ "before": true, "after": true }
```

<!--tabs-->

#### ❌ Incorrect

<!-- prettier-ignore -->
```ts option='{ "before": true, "after": true }'
let foo: string = "bar";
let foo:string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = ()=> {};
```

#### ✅ Correct

<!-- prettier-ignore -->
```ts option='{ "before": true, "after": true }'
let foo : string = "bar";

function foo() : string {}

class Foo {
    name : string;
}

type Foo = () => {};
```

### overrides - colon

```json
{
  "before": false,
  "after": false,
  "overrides": { "colon": { "before": true, "after": true } }
}
```

<!--tabs-->

#### ❌ Incorrect

<!-- prettier-ignore -->
```ts option='{"before":false,"after":false,"overrides":{"colon":{"before":true,"after":true}}}'
let foo: string = "bar";
let foo:string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

type Foo = () =>{};
type Foo = ()=> {};
type Foo = () => {};
```

#### ✅ Correct

<!-- prettier-ignore -->
```ts option='{"before":false,"after":false,"overrides":{"colon":{"before":true,"after":true}}}'
let foo : string = "bar";

function foo() : string {}

class Foo {
    name : string;
}

type Foo = {
    name: (name : string)=>string;
}

type Foo = ()=>{};
```

### overrides - arrow

```json
{
  "before": false,
  "after": false,
  "overrides": { "arrow": { "before": true, "after": true } }
}
```

<!--tabs-->

#### ❌ Incorrect

<!-- prettier-ignore -->
```ts option='{"before":false,"after":false,"overrides":{"arrow":{"before":true,"after":true}}}'
let foo: string = "bar";
let foo : string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name : string;
}

class Foo {
    name :string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = ()=> {};
```

#### ✅ Correct

<!-- prettier-ignore -->
```ts option='{"before":false,"after":false,"overrides":{"arrow":{"before":true,"after":true}}}'
let foo:string = "bar";

function foo():string {}

class Foo {
    name:string;
}

type Foo = () => {};
```

## When Not To Use It

If you don't want to enforce spacing for your type annotations, you can safely turn this rule off.

## Further Reading

- [TypeScript Type System](https://basarat.gitbooks.io/typescript/docs/types/type-system.html)
- [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)

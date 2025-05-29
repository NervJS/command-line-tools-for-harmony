---
Disallow unsafe declaration merging.
---

> See [***documentation***](link to developer.harmonyos.com) for more details.

TypeScript's "declaration merging" supports merging separate declarations with the same name.

Declaration merging between classes and interfaces is unsafe.
The TypeScript compiler doesn't check whether properties are initialized, which can cause lead to TypeScript not detecting code that will cause runtime errors.

```ts
interface Foo {
  nums: number[];
}

class Foo {}

const foo = new Foo();

foo.nums.push(1); // Runtime Error: Cannot read properties of undefined.
```

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
interface Foo {}

class Foo {}
```

### ✅ Correct

```ts
interface Foo {}
class Bar implements Foo {}

namespace Baz {}
namespace Baz {}
enum Baz {}

namespace Qux {}
function Qux() {}
```

## When Not To Use It

If your project intentionally defines classes and interfaces with unsafe declaration merging patterns, this rule might not be for you.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Further Reading

- [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

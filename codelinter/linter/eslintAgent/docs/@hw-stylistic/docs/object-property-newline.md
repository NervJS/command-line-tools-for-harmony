# Enforce placing object properties on separate lines. (`object-property-newline`)

## Rule Details

Enforce placing object properties on separate lines.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_object-property-newline-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
interface II {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5?: string;
}

// Object properties must go on a new line.
const a: II = { p1: 'p1', p2: 'p2',
p3: 'p3', p4: 'p4' };

// Object properties must go on a new line.
const b: II = { p1: 'p1', p2: 'p2', p3: 'p3', p4: 'p4', p5: 'p5' };
```

Examples of **correct** code for this rule.

```ts
interface II {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5?: string;
}

const a: II = {
  p1: 'p1',
  p2: 'p2',
  p3: 'pe',
  p4: 'p4',
  p5: 'p5',
};

const b: II = { p1: 'p1', p2: 'p2', p3: 'p3', p4: 'p4' };
```

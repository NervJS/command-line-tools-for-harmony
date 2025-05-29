export default function moment(): moment.Moment;
declare namespace moment {
  interface Moment extends Object {
    utcOffset(): number;
    utcOffset(b: number|string, keepLocalTime?: boolean): Moment;}}

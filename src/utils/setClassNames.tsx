export default function setClassNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function toggle(open: boolean) {
  localStorage.setItem('open', `${open}`);
}

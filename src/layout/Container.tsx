interface Props {
  children: React.ReactNode;
}

export default function Container(props: Props) {
  const { children } = props;
  return (
    <div
      className="bg-serene-50 p-4 space-y-4 overflow-y-auto"
      style={{ height: 'calc(100vh - 4rem - 1px)' }}
    >
      {children}
    </div>
  );
}

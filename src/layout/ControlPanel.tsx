interface Props {
  children: React.ReactNode;
}

export default function ControlPanel(props: Props) {
  const { children } = props;
  return (
    <div className="bg-serene-50 flex items-center justify-between">
      {children}
    </div>
  );
}

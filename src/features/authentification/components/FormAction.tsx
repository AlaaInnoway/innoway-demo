import { PrimaryButton } from "@component/ui/Button";

interface Props {
  disabled?: boolean;
  label: string;
  handleSubmit?: () => void;
}

export default function FormAction(props: Props) {
  const { disabled, label, handleSubmit } = props;

  return (
    <div className="flex items-center space-x-3 mb-2">
      <PrimaryButton
        disabled={disabled}
        customClass="w-full"
        onClick={handleSubmit}
      >
        <span>{label}</span>
      </PrimaryButton>
    </div>
  );
}

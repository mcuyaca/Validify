import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

interface Props {
  name: string;
  type: string;
}

function LabeledInput({ name, type }: Props) {
  return (
    <>
      <Label className="text-muted-foreground" htmlFor={name}>
        {name}
      </Label>
      <Input type={type} id={name} name={name} placeholder={name} required />
    </>
  );
}

export default LabeledInput;

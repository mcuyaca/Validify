import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Upload() {
  return (
    <div className="mx-auto flex h-full max-w-96 flex-col justify-center gap-4 ">
      <Label className="text-lg font-semibold" htmlFor="file">
        Seleciona un archivo de carga
      </Label>
      <Input id="file" type="file" />
      <Button className="text-center">Upload File</Button>
    </div>
  );
}

export default Upload;

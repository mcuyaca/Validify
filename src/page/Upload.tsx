import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Upload() {
  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <Label className="text-lg font-semibold" htmlFor="file">
        Seleciona un archivo de carga
      </Label>
      <Input id="file" type="file" />
      <Button className="mx-auto w-32 text-center font-bold">
        Upload File
      </Button>
    </div>
  );
}

export default Upload;

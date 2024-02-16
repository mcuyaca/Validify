import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, redirect, useActionData } from "react-router-dom";
import { authProvider } from "@/service/auth";

import { sendFile } from "@/service/file";

interface ActionData {
  error?: string;
}

async function loader({ request }: { request: Request }) {
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return {};
}

async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const rawData = formData.get("file");

  try {
    if (!rawData) {
      throw new Error("No se cargó ningún archivo");
    }
    await sendFile(formData);

    return redirect("/validation");
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message || "Error del servidor",
      };
    }
    return {
      error: "Error del servidor",
    };
  }
}

function Upload() {
  const actionData = useActionData() as ActionData;

  return (
    <Form
      className="mx-auto flex h-full max-w-96 flex-col justify-center gap-4 "
      method="POST"
      encType="multipart/form-data"
    >
      <Label className="text-lg font-semibold" htmlFor="file">
        Seleciona un archivo de carga
      </Label>
      <Input id="file" name="file" accept=".csv" type="file" />
      <Button className="text-center">Upload File</Button>
      {actionData?.error && (
        <p className="text-center text-red-500">{actionData.error}</p>
      )}
    </Form>
  );
}

Upload.loader = loader;
Upload.action = action;

export default Upload;

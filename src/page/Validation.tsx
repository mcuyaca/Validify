import * as React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, X } from "lucide-react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { authProvider } from "@/service/auth";
import { dataSchema } from "@/models/file";
import { ZodError } from "zod";
import { sendRecord } from "@/service/file";

interface ActionData {
  error?: string;
  intent: number;
}

interface ErrorItem {
  row: number;
  details: {
    name?: string;
    email?: string;
    age?: number;
  };
  original: {
    id: string;
    name: string;
    email: string;
    age: number;
  };
}

async function loader({ request }: { request: Request }) {
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  if (!localStorage.getItem("data")) {
    return redirect("/validation");
  }

  return {};
}

async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = Number(formData.get("intent"));

  const name = formData.get(`name-${intent}`);
  const email = formData.get(`email-${intent}`);
  const age = Number(formData.get(`age-${intent}`)); //
  const body = { name, email, password: "supersecret", age, role: "user" };

  try {
    const newRecord = dataSchema.parse(body);
    const oldData = JSON.parse(localStorage.getItem("data")!);
    const oldSuccess = oldData.data.success;
    const oldErrors = oldData.data.errors;
    oldErrors.splice(intent, 1);
    oldSuccess.push(body);
    const newData = {
      ok: true,
      data: { success: oldSuccess, errors: oldErrors },
    };
    localStorage.setItem("data", JSON.stringify(newData));
    await sendRecord(newRecord);

    return {};
  } catch (error) {
    if (error instanceof ZodError) {
      const errorObject: { [key: string]: string } = {};

      error.errors.forEach((error) => {
        const path = error.path.join(".");
        errorObject[path] = error.message;
      });
      console.log(errorObject);
      return { error: JSON.stringify(errorObject), intent };
    }

    if (error instanceof Error) {
      return { error: error.message, intent };
    }
  }
}

function Validation() {
  const actionData = useActionData() as ActionData;
  const [showAlert, setShowAlert] = React.useState(true);
  const navigate = useNavigate();
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  const response = JSON.parse(localStorage.getItem("data")!);

  function handleNewFile() {
    localStorage.removeItem("data");
    navigate("/");
  }

  return (
    <section className=" flex h-full flex-col justify-center gap-4">
      <div className="relative flex h-20 items-center justify-end">
        {showAlert && (
          <Alert className=" absolute left-0 right-0 mx-auto flex w-fit border-green-700">
            <AlertTitle className="my-0 flex items-center justify-center gap-3 text-base text-green-700 ">
              <CheckCircle color="#059669" className="h-4 w-4" />
              Se cargaron {response.data.success.length} registros
              satisfactoriamente.
              <X onClick={toggleAlert} color="#b91c1c" />
            </AlertTitle>
          </Alert>
        )}
        <Button onClick={handleNewFile}>New File</Button>
      </div>

      <h2 className=" text-3xl font-semibold tracking-tight ">
        Errores al cargar
      </h2>
      <p className="text-base leading-7 text-muted-foreground  ">
        Los ({response.data.errors.length}) registros listados a continuación
        encontraron errores. Por favor, corrige estos problemas e intenta
        nuevamente.
      </p>

      <Form
        className="rounded-md border"
        method="POST"
        encType="multipart/form-data"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">Row</TableHead>
              <TableHead className="w-fit">Name</TableHead>
              <TableHead className="w-fit">Email</TableHead>
              <TableHead className="w-fit">Age</TableHead>
              <TableHead className="w-fit"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-foreground">
            {response.data.errors.map((item: ErrorItem, index: number) => {
              const key = item.row;
              const details = item.details;
              const original = item.original;
              return (
                <TableRow id={key.toString()}>
                  <TableCell>{key}</TableCell>
                  <TableCell>
                    <Input
                      name={`name-${index}`}
                      className={details.name ? "border-red-700" : ""}
                      type={details.name ? "text" : "hidden"}
                      placeholder={original.name}
                      defaultValue={original.name}
                    />
                    {!details.name && original.name}
                    {details.name && (
                      <p className="mt-2 text-red-700">{details.name}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`email-${index}`}
                      className={details.email ? "border-red-700" : ""}
                      type={details.email ? "email" : "hidden"}
                      placeholder={original.email}
                      defaultValue={original.email}
                    />
                    {!details.email && original.email}
                    {details.email && (
                      <p className="mt-2 text-red-700">{details.email}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`age-${index}`}
                      className={details.age ? "w-fit border-red-700" : ""}
                      type={details.age ? "number" : "hidden"}
                      min="0"
                      placeholder={original.age.toString()}
                      defaultValue={original.age}
                    />
                    {!details.age && original.age}
                    {details.age && (
                      <p className="mt-2 text-red-700">{details.age}</p>
                    )}
                  </TableCell>
                  <TableCell className=" flex justify-center">
                    <Button name="intent" value={index} variant={"outline"}>
                      Retry
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Form>
      {actionData?.error && (
        <p className="text-center text-red-700">
          {`Error en Row ${actionData.intent + 1} : `}
          {actionData.error}
        </p>
      )}
    </section>
  );
}

Validation.loader = loader;
Validation.action = action;
export default Validation;

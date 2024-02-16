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
import { redirect, useNavigate } from "react-router-dom";
import { authProvider } from "@/service/auth";

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

function Validation() {
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

      <div className="rounded-md border">
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
            {response.data.errors.map((item: ErrorItem) => {
              const key = item.row;
              const details = item.details;
              const original = item.original;
              return (
                <TableRow id={key.toString()}>
                  <TableCell className="itemes-center flex flex-col justify-center">
                    {item.row + 1}
                  </TableCell>
                  <TableCell>
                    <Input
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
                      className={details.age ? "w-fit border-red-700" : ""}
                      type={details.age ? "number" : "hidden"}
                      placeholder={original.age.toString()}
                      defaultValue={original.age}
                    />
                    {!details.age && original.age}
                    {details.age && (
                      <p className="mt-2 text-red-700">{details.age}</p>
                    )}
                  </TableCell>
                  <TableCell className=" flex justify-center">
                    <Button variant={"outline"}>Retry</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

Validation.loader = loader;
export default Validation;

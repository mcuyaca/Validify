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

const response = JSON.parse(localStorage.getItem("data")!);
function Validation() {
  const [showAlert, setShowAlert] = React.useState(true);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <section className=" flex h-full flex-col justify-center gap-4">
      <div className="relative flex h-20 items-center justify-end">
        {showAlert && (
          <Alert className=" absolute left-0 right-0 mx-auto flex w-fit border-green-700">
            <AlertTitle className="my-0 flex items-center justify-center gap-3 text-base text-green-700 ">
              <CheckCircle color="#059669" className="h-4 w-4" />
              Se cargaron 18 registros satisfactoriamente.
              <X onClick={toggleAlert} color="#991B1B" />
            </AlertTitle>
          </Alert>
        )}
        <Button>New File</Button>
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
              <TableHead>Row</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-28">Age</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-foreground">
            {response.data.errors.map((item) => {
              const key = item.row;
              const details = item.details;
              const original = item.original;
              return (
                <TableRow id={key.toString()}>
                  <TableCell>
                    <Input
                      className="border-0"
                      type="hidden"
                      value={original.id}
                    />
                    {original.id}
                  </TableCell>
                  <TableCell>
                    <Input
                      className={details.name ? "" : "border-0"}
                      type={details.name ? "text" : "hidden"}
                      placeholder={original.name}
                      defaultValue={original.name}
                    />
                    {!details.name && original.name}
                  </TableCell>
                  <TableCell>
                    <Input
                      type={details.email ? "email" : "hidden"}
                      placeholder={original.email}
                      defaultValue={original.email}
                    />
                    {!details.email && original.email}
                  </TableCell>
                  <TableCell>
                    <Input
                      type={details.age ? "number" : "hidden"}
                      placeholder={original.age.toString()}
                      defaultValue={original.age}
                    />
                    {!details.age && original.age}
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

export default Validation;

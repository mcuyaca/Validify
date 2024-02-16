import { authProvider } from "@/service/auth";
import LabeledInput from "@/components/LabeledInput";
import { Button } from "@/components/ui/button";
import BasicLayout from "@/layout/BasicLoyout";
import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

interface ActionData {
  error?: string;
}

async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("Email")?.toString();
  const password = formData.get("Password")?.toString();
  try {
    await authProvider.login(email!, password!);
  } catch (error) {
    console.log(error);
    return {
      error: "Invalid login attempt",
    };
  }

  const redirectTo = formData.get("redirectTo")?.toString();
  return redirect(redirectTo || "/");
}

function Login() {
  const actionData = useActionData() as ActionData;
  const navigation = useNavigation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("from");
  const isSubmitting = navigation.state === "submitting";

  return (
    <BasicLayout>
      <section className="m-auto flex h-full w-full  max-w-sm  flex-col items-center justify-center gap-4">
        <h1
          className="inline-block bg-gradient-to-b from-purple-700  to-blue-700 bg-clip-text
       text-center font-logo text-8xl font-bold leading-tight tracking-tighter
        text-transparent "
        >
          Validify
        </h1>
        <h2 className="mb-5 scroll-m-20 text-center text-3xl  tracking-tight ">
          Sistema de carga de datos
        </h2>

        <Form className="flex w-80 flex-col gap-4 " method="POST">
          {redirectTo && (
            <input type="hidden" name="redirectTo" value={redirectTo} />
          )}
          <LabeledInput type="email" name="Email" />
          <LabeledInput type="password" name="Password" />
          <Button className="mt-2">
            {" "}
            {isSubmitting ? "Entering ..." : "Login"}{" "}
          </Button>
          {actionData?.error && (
            <p className="text-center text-red-500">{actionData.error}</p>
          )}
        </Form>
      </section>
    </BasicLayout>
  );
}

Login.action = action;
export default Login;

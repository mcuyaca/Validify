import LabeledInput from "@/components/LabeledInput";
import { Button } from "@/components/ui/button";
import BasicLayout from "@/layout/BasicLoyout";

function Login() {
  return (
    <BasicLayout>
      <section className="m-auto flex h-full w-full  max-w-sm  flex-col justify-center gap-4">
        <h1
          className="font-logo inline-block bg-gradient-to-b  from-purple-700 to-blue-700
       bg-clip-text text-center text-8xl font-bold leading-tight tracking-tighter
        text-transparent "
        >
          Validify
        </h1>
        <h2 className="mb-5 scroll-m-20 text-center text-3xl  tracking-tight ">
          Sistema de carga de datos
        </h2>

        <LabeledInput type="email" name="Email" />
        <LabeledInput type="password" name="Password" />
        <Button className="mt-2"> Login </Button>
      </section>
    </BasicLayout>
  );
}

export default Login;

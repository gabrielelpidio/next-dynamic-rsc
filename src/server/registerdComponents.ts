const RegisteredComponents = new Map<string, any>();

RegisteredComponents.set(
  "@/components/ServerCounter",
  () => import("@/components/ServerCounter")
);

export default RegisteredComponents;

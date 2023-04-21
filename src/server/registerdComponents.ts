const RegisteredComponents = new Map<string, any>();

RegisteredComponents.set("@/components/serverCounter", () => import('@/components/serverCounter'))

export default RegisteredComponents
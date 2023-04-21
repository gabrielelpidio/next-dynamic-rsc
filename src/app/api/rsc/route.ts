import rscHandleRequest from "@/server/rscHandler";

export async function GET(req: Request) {
  return rscHandleRequest(req)
}

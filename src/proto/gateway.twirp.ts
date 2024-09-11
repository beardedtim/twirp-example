import { Gateway, Pattern } from "twirp-ts";
import { match } from "path-to-regexp";

export function createGateway() {
  return new Gateway({
    post: [
      {
        packageName: "",
        methodName: "CreateAccount",
        serviceName: "AccountService",
        httpMethod: "post" as Pattern,
        matchingPath: "/v1/account{:query_string(\\?.*)}?",
        matcher: match("/v1/account{:query_string(\\?.*)}?"),
        bodyKey: "*",
        responseBodyKey: "",
      },
    ],
    get: [],
    put: [],
    patch: [],
    delete: [],
  });
}

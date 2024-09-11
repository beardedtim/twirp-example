import {
  TwirpContext,
  TwirpServer,
  RouterEvents,
  TwirpError,
  TwirpErrorCode,
  Interceptor,
  TwirpContentType,
  chainInterceptors,
} from "twirp-ts";
import { AccountCreateRequestEvent, AccountCreatedEvent } from "./events";

//==================================//
//          Client Code             //
//==================================//

interface Rpc {
  request(
    service: string,
    method: string,
    contentType: "application/json" | "application/protobuf",
    data: object | Uint8Array
  ): Promise<object | Uint8Array>;
}

export interface AccountServiceClient {
  CreateAccount(
    request: AccountCreateRequestEvent
  ): Promise<AccountCreatedEvent>;
}

export class AccountServiceClientJSON implements AccountServiceClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateAccount.bind(this);
  }
  CreateAccount(
    request: AccountCreateRequestEvent
  ): Promise<AccountCreatedEvent> {
    const data = AccountCreateRequestEvent.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "AccountService",
      "CreateAccount",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      AccountCreatedEvent.fromJson(data as any, { ignoreUnknownFields: true })
    );
  }
}

export class AccountServiceClientProtobuf implements AccountServiceClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateAccount.bind(this);
  }
  CreateAccount(
    request: AccountCreateRequestEvent
  ): Promise<AccountCreatedEvent> {
    const data = AccountCreateRequestEvent.toBinary(request);
    const promise = this.rpc.request(
      "AccountService",
      "CreateAccount",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      AccountCreatedEvent.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface AccountServiceTwirp<T extends TwirpContext = TwirpContext> {
  CreateAccount(
    ctx: T,
    request: AccountCreateRequestEvent
  ): Promise<AccountCreatedEvent>;
}

export enum AccountServiceMethod {
  CreateAccount = "CreateAccount",
}

export const AccountServiceMethodList = [AccountServiceMethod.CreateAccount];

export function createAccountServiceServer<
  T extends TwirpContext = TwirpContext
>(service: AccountServiceTwirp<T>) {
  return new TwirpServer<AccountServiceTwirp, T>({
    service,
    packageName: "",
    serviceName: "AccountService",
    methodList: AccountServiceMethodList,
    matchRoute: matchAccountServiceRoute,
  });
}

function matchAccountServiceRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "CreateAccount":
      return async (
        ctx: T,
        service: AccountServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          AccountCreateRequestEvent,
          AccountCreatedEvent
        >[]
      ) => {
        ctx = { ...ctx, methodName: "CreateAccount" };
        await events.onMatch(ctx);
        return handleAccountServiceCreateAccountRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleAccountServiceCreateAccountRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AccountServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    AccountCreateRequestEvent,
    AccountCreatedEvent
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleAccountServiceCreateAccountJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleAccountServiceCreateAccountProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleAccountServiceCreateAccountJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AccountServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    AccountCreateRequestEvent,
    AccountCreatedEvent
  >[]
) {
  let request: AccountCreateRequestEvent;
  let response: AccountCreatedEvent;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = AccountCreateRequestEvent.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      AccountCreateRequestEvent,
      AccountCreatedEvent
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateAccount(ctx, inputReq);
    });
  } else {
    response = await service.CreateAccount(ctx, request!);
  }

  return JSON.stringify(
    AccountCreatedEvent.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleAccountServiceCreateAccountProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: AccountServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    AccountCreateRequestEvent,
    AccountCreatedEvent
  >[]
) {
  let request: AccountCreateRequestEvent;
  let response: AccountCreatedEvent;

  try {
    request = AccountCreateRequestEvent.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      AccountCreateRequestEvent,
      AccountCreatedEvent
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateAccount(ctx, inputReq);
    });
  } else {
    response = await service.CreateAccount(ctx, request!);
  }

  return Buffer.from(AccountCreatedEvent.toBinary(response));
}

// @generated by protobuf-ts 2.9.4 with parameter client_none,generate_dependencies
// @generated from protobuf file "events.proto" (syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * messages are similar to structs in Go or
 * interfaces/types in Typescript
 *
 * They allow us to define the shape of the data
 * that we will be sending and receiving and then
 * the compiler ensures that we can encode/decode
 * the data correctly
 *
 * @generated from protobuf message AccountCreateRequestEvent
 */
export interface AccountCreateRequestEvent {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string; // <type> <name> = <index>;
    /**
     * @generated from protobuf field: string email = 2;
     */
    email: string;
}
/**
 * @generated from protobuf message AccountCreatedEvent
 */
export interface AccountCreatedEvent {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string email = 3;
     */
    email: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class AccountCreateRequestEvent$Type extends MessageType<AccountCreateRequestEvent> {
    constructor() {
        super("AccountCreateRequestEvent", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<AccountCreateRequestEvent>): AccountCreateRequestEvent {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.email = "";
        if (value !== undefined)
            reflectionMergePartial<AccountCreateRequestEvent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AccountCreateRequestEvent): AccountCreateRequestEvent {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* string email */ 2:
                    message.email = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AccountCreateRequestEvent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* string email = 2; */
        if (message.email !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.email);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message AccountCreateRequestEvent
 */
export const AccountCreateRequestEvent = new AccountCreateRequestEvent$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccountCreatedEvent$Type extends MessageType<AccountCreatedEvent> {
    constructor() {
        super("AccountCreatedEvent", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<AccountCreatedEvent>): AccountCreatedEvent {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.id = "";
        message.name = "";
        message.email = "";
        if (value !== undefined)
            reflectionMergePartial<AccountCreatedEvent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AccountCreatedEvent): AccountCreatedEvent {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string id */ 1:
                    message.id = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string email */ 3:
                    message.email = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AccountCreatedEvent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string id = 1; */
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string email = 3; */
        if (message.email !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.email);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message AccountCreatedEvent
 */
export const AccountCreatedEvent = new AccountCreatedEvent$Type();
/**
 * @generated ServiceType for protobuf service AccountService
 */
export const AccountService = new ServiceType("AccountService", [
    { name: "CreateAccount", options: { "google.api.http": { post: "/v1/account", body: "*" } }, I: AccountCreateRequestEvent, O: AccountCreatedEvent }
]);

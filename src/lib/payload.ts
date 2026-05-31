import { getPayload } from "payload";
import config from "@payload-config";

/** Cached Payload local-API instance (no HTTP hop). */
export const getPayloadClient = async () => getPayload({ config });

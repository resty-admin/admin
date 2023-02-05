import { environment } from "@env/environment";
import type { SocketIoConfig } from "ngx-socket-io";

const { hostname, port } = new URL(environment.wsUrl);
const url = `${hostname}:${port}`;

export const SOCKET_IO_CONFIG: SocketIoConfig = {
	url,
	options: {
		autoConnect: true
	}
};

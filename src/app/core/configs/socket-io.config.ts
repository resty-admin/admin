import { environment } from "@env/environment";
import type { SocketIoConfig } from "ngx-socket-io";

const { hostname, port } = new URL(environment.apiUrl);
const url = environment.production ? `dev-api-ws.resty.od.ua` : `${hostname}:${8081 || port}`;

export const SOCKET_IO_CONFIG: SocketIoConfig = {
	url,
	options: {
		autoConnect: true
	}
};

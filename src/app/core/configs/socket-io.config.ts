import type { SocketIoConfig } from "ngx-socket-io";

import { environment } from "../../../environments/environment";

const { hostname, port } = new URL(environment.apiUrl);
const url = environment.production ? hostname : `${hostname}:${port}`;

export const SOCKET_IO_CONFIG: SocketIoConfig = {
	url,
	options: {
		autoConnect: true
	}
};

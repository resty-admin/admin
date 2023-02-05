import { environment } from "@env/environment";
import type { SocketIoConfig } from "ngx-socket-io";

export const SOCKET_IO_CONFIG: SocketIoConfig = {
	url: environment.wsUrl,
	options: {
		autoConnect: true
	}
};

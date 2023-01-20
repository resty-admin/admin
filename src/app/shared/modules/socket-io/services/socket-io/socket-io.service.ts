import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { merge } from "rxjs";

@Injectable({ providedIn: "root" })
export class SocketIoService {
	constructor(private readonly _socket: Socket) {}

	emit(eventName: string, ...arguments_: unknown[]) {
		this._socket.emit(eventName, ...arguments_);
	}

	fromEvent<T>(eventName: string) {
		return this._socket.fromEvent<T>(eventName);
	}

	fromEvents<T>(events: string[]) {
		return merge(...events.map((event) => this._socket.fromEvent<T>(event)));
	}
}

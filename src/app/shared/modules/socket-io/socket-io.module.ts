import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import type { SocketIoConfig } from "ngx-socket-io";
import { SocketIoModule as _SocketIoModule } from "ngx-socket-io";

@NgModule({
	imports: [_SocketIoModule],
	exports: [_SocketIoModule]
})
export class SocketIoModule {
	static forRoot(config: SocketIoConfig): ModuleWithProviders<SocketIoModule> {
		return {
			ngModule: SocketIoModule,
			providers: _SocketIoModule.forRoot(config).providers
		};
	}
}

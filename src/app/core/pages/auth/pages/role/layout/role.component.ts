import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "src/app/shared/routes";

import { UserRoleEnum } from "../../../../../../../graphql";

@Component({
	selector: "app-role",
	templateUrl: "./role.component.html",
	styleUrls: ["./role.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent {
	readonly adminRoutes = ADMIN_ROUTES;

	readonly roles = [
		{
			label: "Менеджер",
			value: UserRoleEnum.Admin,
			image: "manager",
			description:
				"Ме́неджер — специалист, занятый управлением процессами и персоналом на определённом участке предприятия, организации. Может быть её владельцем, но часто является наёмным работником."
		},
		{
			label: "Хостес",
			value: UserRoleEnum.Hostess,
			image: "hostess",
			description:
				"Хостес – это человек, который встречает гостей при входе в ресторан (на выставку, конференцию, презентацию, отель, клуб) и помогает освоиться на новом для вас месте (мероприятии)."
		},
		{
			label: "Официант",
			value: UserRoleEnum.Waiter,
			image: "waiter",
			description:
				"Официант – это специалист, работающий в сфере общественного питания и обслуживающий клиентов, пришедших в ресторан, кафе или пиццерию. Наличие в том или ином заведении официанта определяется политикой заведения. Как правило, официант является признаком высокого уровня и хорошего класса обслуживания ресторана или кафе.\n"
		},
		{
			label: "Кальянщик",
			value: UserRoleEnum.Hookah,
			image: "hookah",
			description:
				"Кальянщик – достаточно новая профессия для нашего общества. Это специалист, который заботится о набивке, розжиге и подаче кальяна. Часто он воспринимается как бармен или официант, не являясь ни тем, ни другим. Он принимает заказы от клиентов, выполняет подготовку, проверяет трубки и шланги, заполняет колбу.\n"
		}
	];

	trackByFn(index: number) {
		return index;
	}
}

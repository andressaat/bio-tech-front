import { SafeHtml } from '@angular/platform-browser';

export class Alert {
    type: AlertType;
    message: string;
    animate: string;
    icon: SafeHtml;
    alertId: string;
    keepAfterRouteChange: boolean;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}

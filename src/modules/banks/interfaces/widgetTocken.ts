import { AcquiringWidgetMetadata, Error, SelfEmployedWidgetMetadata, TokenizeWidgetMetadata } from "."

export interface RequestWidgetToken {
    tokenize_widget?: TokenizeWidgetMetadata
    self_employed_widget?: SelfEmployedWidgetMetadata
    acquiring_widget?: AcquiringWidgetMetadata
}

export interface ResponseWidgetToken {
    status: 'error' | 'ok'
    public_token?: string
    error?: Error
}
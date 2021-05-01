import TJSendResponse from './JSendResponse.type'

class JSendError extends Error {
	private readonly _code: number
	private readonly _data: any

	constructor(messageOrResponse: string | TJSendResponse, code?: number, data?: any) {
		super(JSendError.isResponse(messageOrResponse) ? (messageOrResponse as TJSendResponse).message : JSendError.isString(messageOrResponse) ? (messageOrResponse as string) : undefined)

		this._code = code || (messageOrResponse as TJSendResponse)?.code
		this._data = data || (messageOrResponse as TJSendResponse)?.data

		this.name = 'JSendError'

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, JSendError)
		}
	}

	get code(): number {
		return this._code
	}

	get data(): any {
		return this._data
	}

	private static isResponse(messageOrResponse: string | TJSendResponse): messageOrResponse is TJSendResponse {
		return !!(messageOrResponse as TJSendResponse)?.status
	}

	private static isString(messageOrResponse: string | TJSendResponse): messageOrResponse is string {
		return typeof messageOrResponse === 'string'
	}
}

export default JSendError

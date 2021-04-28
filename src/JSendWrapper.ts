import TJSendResponse from './JSendResponse.type'
import EJSendStatus from './JSendStatus.enum'

class JSendWrapper {
	wrap(statusCode: number, body: any, errorCode?: number, errorData?: any): TJSendResponse {
		const status: EJSendStatus = JSendWrapper.getStatus(statusCode)
		switch (status) {
			case EJSendStatus.ERROR:
				return { status, message: body || 'Error', ...(!!errorCode && { code: errorCode }), ...(!!errorData && { data: errorData }) }
		}
		return { status, data: body || null }
	}

	private static getStatus(code: number): EJSendStatus {
		switch (true) {
			case code >= 500:
				return EJSendStatus.ERROR
			case code >= 400 && code < 500:
				return EJSendStatus.FAIL
		}
		return EJSendStatus.SUCCESS
	}
}

export default JSendWrapper

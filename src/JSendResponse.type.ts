import EJSendStatus from './JSendStatus.enum'

type TJSendResponse = {
	status: EJSendStatus
	data?: any
	message?: string,
	code?: number
}

export default TJSendResponse

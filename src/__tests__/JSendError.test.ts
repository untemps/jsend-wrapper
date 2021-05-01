import JSendError from '../JSendError'
import { TJSendResponse } from '../index'
import EJSendStatus from '../JSendStatus.enum'

describe('JSendError', () => {
	it('should instantiate the wrapper with no error', () => {
		expect(() => new JSendError('foo')).not.toThrow()
	})

	it.each([
		[{}, ''],
		[{ status: EJSendStatus.ERROR }, ''],
		[{ status: EJSendStatus.ERROR, message: 'foo' }, 'foo'],
	])('should extract message from response type', (response: TJSendResponse, expected: string) => {
		expect(new JSendError(response).message).toEqual(expected)
	})

	it.each([
		[{}, undefined],
		[{ status: EJSendStatus.ERROR }, undefined],
		[{ status: EJSendStatus.ERROR, code: 500 }, 500],
	])('should extract code from response type', (response: TJSendResponse, expected: number) => {
		expect(new JSendError(response).code).toEqual(expected)
	})

	it.each([
		[{}, undefined],
		[{ status: EJSendStatus.ERROR }, undefined],
		[{ status: EJSendStatus.ERROR, data: [] }, []],
	])('should extract data from response type', (response: TJSendResponse, expected: any) => {
		expect(new JSendError(response).data).toEqual(expected)
	})

	it.each([['foo', 'foo']])('should extract message from argument', (message: string, expected: string) => {
		expect(new JSendError(message).message).toEqual(expected)
	})

	it.each([
		[500, undefined, 500],
		[500, 'foo', 500],
		[500, { status: EJSendStatus.ERROR }, 500],
		[500, { status: EJSendStatus.ERROR, code: 501 }, 500],
	])('should extract code from argument', (code: number, messageOrResponse: string | TJSendResponse, expected: number) => {
		expect(new JSendError(messageOrResponse, code).code).toEqual(expected)
	})

	it.each([
		[[], undefined, undefined, []],
		[[], 'foo', 500, []],
		[[], { status: EJSendStatus.ERROR }, 500, []],
		[[], { status: EJSendStatus.ERROR, data: 42 }, 500, []],
	])('should extract data from argument', (data: any, messageOrResponse: string | TJSendResponse, code: number, expected: any) => {
		expect(new JSendError(messageOrResponse, code, data).data).toEqual(expected)
	})
})

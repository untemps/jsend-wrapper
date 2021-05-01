import JSendWrapper from '../JSendWrapper'

describe('JSendWrapper', () => {
	it('should instantiate the wrapper with no error', () => {
		expect(() => new JSendWrapper()).not.toThrow()
	})

	it.each([
		[200, 'foo', undefined, undefined, { status: 'success', data: 'foo' }],
		[201, 'foo', undefined, undefined, { status: 'success', data: 'foo' }],
		[300, 'foo', undefined, undefined, { status: 'success', data: 'foo' }],
		[400, 'foo', undefined, undefined, { status: 'fail', data: 'foo' }],
		[499, 'foo', undefined, undefined, { status: 'fail', data: 'foo' }],
		[500, 'foo', undefined, undefined, { status: 'error', message: 'foo', code: 500 }],
		[500, ['foo'], undefined, undefined, { status: 'error', message: ['foo'], code: 500 }],
		[200, 42, undefined, undefined, { status: 'success', data: 42 }],
		[200, undefined, undefined, undefined, { status: 'success', data: null }],
		[500, undefined, undefined, undefined, { status: 'error', message: 'Error', code: 500 }],
		[500, 'foo', undefined, undefined, { status: 'error', message: 'foo', code: 500 }],
		[500, 'foo', 12, undefined, { status: 'error', message: 'foo', code: 12 }],
		[500, 'foo', 12, 'bar', { status: 'error', message: 'foo', code: 12, data: 'bar' }],
		[500, 'foo', undefined, 'bar', { status: 'error', message: 'foo', code: 500, data: 'bar' }],
	])('should wrap the response in the right format', (statusCode, data, errorCode, errorData, expected) => {
		expect(new JSendWrapper().wrap(statusCode, data, errorCode, errorData)).toEqual(expected)
	})
})

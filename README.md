# @untemps/jsend-wrapper

Class to wrap an HTTP response in a [JSend Specification](https://github.com/omniti-labs/jsend) format.

The status string (`success`, `fail`, `error`) is calculated along with the HTTP status code of the response:

-   If the status code is greater or equal to `500`, `status` is set to `error`
-   If the status code is greater or equal to `400` and strictly lower to `500`, `status` is set to `fail`
-   Otherwise, `status` is set to `success`

![npm](https://img.shields.io/npm/v/@untemps/jsend-wrapper?style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/untemps/jsend-wrapper/deploy?style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/untemps/jsend-wrapper?style=for-the-badge)

## Installation

```bash
yarn add @untemps/jsend-wrapper
```

## Usage

Import `JSendWrapper`:

```javascript
import { JSendWrapper } from '@untemps/jsend-wrapper'
```

Create an instance of `JSendWrapper`:

```javascript
const jsend = new JSendWrapper()
```

Call the `wrap` method passing two mandatory and two optional arguments:

```javascript
jsend.wrap([statusCode], [body], [errorCode], [errorData])
```

### `wrap` Method Arguments

| Parameter  | Type   | Description                                                              |
| ---------- | ------ | ------------------------------------------------------------------------ |
| statusCode | number | HTTP code of the response                                                |
| body       | any    | Body of the response. Depending of the status (see below)                |
| errorCode  | number | (Optional) A numeric code corresponding to the error                     |
| errorData  | any    | (Optional) A generic container for any other information about the error |

#### The `body` Argument

The type of the body argument depends on the status:

| Status    | Type   | Description                                                                              |
| --------- | ------ | ---------------------------------------------------------------------------------------- |
| `success` | any    | Data returned by the HTTP request. If the call returns no data, data is set to null.     |
| `fail`    | object | Hash of key/value pairs explaining what went wrong in the HTTP request (validation, ...) |
| `error`   | string | Meaningful, end-user-readable message, explaining the reason of the error                |

### Formatted Result

#### Success

```javascript
{
    status: 'success',
    data: {
        post: {
            id: 1,
            title: 'A blog post',
            body: 'Some useful content'
        }
     }
}
```

#### Fail

```javascript
{
    status: 'fail', 
    data: {
    	title: 'A title is required'
    }
}
```

#### Error

```javascript
{
    status: 'error', 
    message: 'Unable to communicate with database'
}
```

## `JSendError`

A JSendError class is provided to help throwing specific JSend errors.

The constructor accepts either plain `message`, `code`, `data` arguments or a `JSendResponse` object:

```
import { JSendError } from '@untemps/jsend-wrapper'

throw new JSendError('HTTP Error', 500, { someValue: 42 })
throw new JSendError({ status: 'error', message: 'HTTP Error', code: 500, data: { someValue: 42 })
```

## Types

Besides the class wrapper, the lib exports the definitions for the response type (`TJSendResponse`) and the status enum (`EJSendStatus`).

### `TJSendResponse`

```typescript
status: EJSendStatus
data?: any
message?: string,
code?: number
```

### `EJSendStatus`

```typescript
SUCCESS = 'success'
FAIL = 'fail'
ERROR = 'error'
```

---

For more information about the JSend Spec, see the GitHub README here : [https://github.com/omniti-labs/jsend](https://github.com/omniti-labs/jsend)

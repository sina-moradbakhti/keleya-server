export const DatabaseConnectionfailed = {
    status: 503,
    output: {
        status: 503,
        message: 'Server Error #503db123'
    }
}

export const DatabaseConnectionSuccess = {
    status: 200,
    output: {
        status: 200,
        message: 'Db Connected Successfully.'
    }
}

export const JwtAuthenticanFailed = {
    status: 403,
    output: {
        status: 403,
        message: 'Authentication Failed!'
    }
}
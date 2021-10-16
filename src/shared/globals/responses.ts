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

export const UserCreateAccountRegisteredSuccessfully = {
    status: 200,
    output: {
        status: 200,
        message: 'The user registered successfully.',
        result: {}
    }
}

export const UserCreateAccountUserAlreadyExist = {
    status: 403,
    output: {
        status: 403,
        message: 'The user already registered.'
    }
}

export const UserCreateAccountUserNotFound = {
    status: 403,
    output: {
        status: 403,
        message: 'The user not found.'
    }
}

export const UserCreateAccountRequiredFields = {
    status: 403,
    output: {
        status: 403,
        message: 'Please send all required fields.'
    }
}

export const UserSignInToAccountRequiredFields = {
    status: 403,
    output: {
        status: 403,
        message: 'Please send all required fields.'
    }
}

export const UserSignInToAccountRegisteredSuccessfully = {
    status: 200,
    output: {
        status: 200,
        message: 'The user signed in successfully.',
        result: {}
    }
}

export const UserUpdatedSuccessfully = {
    status: 200,
    output: {
        status: 200,
        message: 'The user updated successfully.',
        result: {}
    }
}

export const TokenUpdatedSuccessfully = {
    status: 200,
    output: {
        status: 200,
        message: 'The token updated successfully.',
        result: {}
    }
}

export const TokenUpdatingFailed = {
    status: 403,
    output: {
        status: 403,
        message: 'The token updating was failed.',
        result: {}
    }
}

export const UserUpdatingFailed = {
    status: 403,
    output: {
        status: 403,
        message: 'The user updating was failed.',
        result: {}
    }
}

export const TheUserNotFound = {
    status: 403,
    output: {
        status: 403,
        message: 'The user not found.'
    }
}
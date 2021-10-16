import express from 'express';
import bodyParser from 'body-parser';
import { jwtGenerateToken } from './shared/globals/jwt-functions';
import { authenticateToken } from './shared/globals/middlewares';
import { UserModel, UserInterface } from './shared/models/user.model';
import {
    TheUserNotFound,
    UserCreateAccountRegisteredSuccessfully,
    UserCreateAccountRequiredFields,
    UserCreateAccountUserAlreadyExist,
    UserCreateAccountUserNotFound,
    UserSignInToAccountRegisteredSuccessfully,
    UserUpdatedSuccessfully,
    UserUpdatingFailed,
    TokenUpdatedSuccessfully,
    TokenUpdatingFailed
} from './shared/globals/responses';
//const token_secret = require('crypto').randomBytes(64).toString('hex');

const app = express();
const port = 3000;
UserModel.sync();

async function checkUserExistByToken(req, res): Promise<UserInterface> {
    let found = await UserModel.findOne({ where: { email: req.body.email, token: req.body.token } });
    if (found === null) {
        res.status(UserCreateAccountUserNotFound.status).json(UserCreateAccountUserNotFound.output);
        return null;
    } else {
        return found;
    }
}

async function checkUserExist(req, res, isSignInCheck = false): Promise<UserInterface> {
    let found = await UserModel.findOne(
        isSignInCheck ?
            { where: { email: req.body.email, password: req.body.password } } :
            { where: { email: req.body.email } });

    if (found !== null) {
        if (!isSignInCheck) {
            res.status(UserCreateAccountUserAlreadyExist.status)
                .json(UserCreateAccountUserAlreadyExist.output);
        }
        return found;
    } else {
        if (isSignInCheck) {
            res.status(UserCreateAccountUserNotFound.status)
                .json(UserCreateAccountUserNotFound.output);
        }
        return null;
    }
}
function checkRequiredFieldsForRefreshToken(req, res): boolean {
    if (req.body.id === undefined || req.body.email === undefined || req.body.token === undefined) {
        res.status(UserCreateAccountRequiredFields.status)
            .json(UserCreateAccountRequiredFields.output);
        return false;
    }
    return true;
}
function checkRequiredFieldsForUpdate(req, res): boolean {
    if (req.body.id === undefined || req.body.email === undefined) {
        res.status(UserCreateAccountRequiredFields.status)
            .json(UserCreateAccountRequiredFields.output);
        return false;
    }
    return true;
}
function checkRequiredFields(req, res): boolean {
    if (req.body.email === undefined || req.body.password === undefined) {
        res.status(UserCreateAccountRequiredFields.status)
            .json(UserCreateAccountRequiredFields.output);
        return false;
    }
    return true;
}
async function validateUser(req): Promise<UserInterface> {
    return await UserModel.findOne({ where: { email: req.body.email, id: req.body.id } });
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.post('/api/users', async (req, res) => {

    if (!checkRequiredFields(req, res)) return;
    let checkUser = await checkUserExist(req, res);
    if (checkUser !== null) return;

    // Generate JWT Token
    var token = jwtGenerateToken({ email: req.body.email });
    // Preparing output

    let user = await UserModel.create({
        email: req.body.email,
        password: req.body.password,
        accepted_privacy_policy: 1,
        accepted_terms_and_conditions: 1,
        token: token
    });

    UserCreateAccountRegisteredSuccessfully.output.result = {
        token: token,
        id: user.id
    };

    res.status(UserCreateAccountRegisteredSuccessfully.status)
        .json(UserCreateAccountRegisteredSuccessfully.output);

});

app.patch('/api/users', authenticateToken, async (req, res) => {

    if (!checkRequiredFieldsForUpdate(req, res)) return;
    let checkUser = await validateUser(req);
    if (checkUser === null) {
        res.status(TheUserNotFound.status)
            .json(TheUserNotFound.output);
        return;
    }

    // Generate JWT Token
    var token = jwtGenerateToken({ email: checkUser.email });
    // Preparing output

    // Checking allowed fields
    var clearInput: any = {};
    if (req.body.name !== undefined) clearInput.name = req.body.name;
    if (req.body.baby_birth_date !== undefined) clearInput.baby_birth_date = req.body.baby_birth_date;
    if (req.body.onboarding_done !== undefined) clearInput.onboarding_done = req.body.onboarding_done;
    clearInput.token = token;
    // Checking allowed fields

    await UserModel.update(
        clearInput,
        { where: { email: checkUser.email, id: checkUser.id } })
        .then(() => {
            UserUpdatedSuccessfully.output.result = {
                token: token
            };

            res.status(UserUpdatedSuccessfully.status)
                .json(UserUpdatedSuccessfully.output);

        }).catch((err) => {
            UserUpdatingFailed.output.result = {
                error: err
            }
            res.status(UserUpdatingFailed.status)
                .json(UserUpdatingFailed.output);
        });
});

app.post('/api/users/auth', async (req, res) => {

    if (!checkRequiredFields(req, res)) return;
    let checkUser = await checkUserExist(req, res, true);
    if (checkUser === null) return;

    // Generate JWT Token
    var token = jwtGenerateToken({ email: req.body.email });
    // Preparing output
    UserSignInToAccountRegisteredSuccessfully.output.result = {
        token: token,
        id: checkUser.id,
        onboarding_done: checkUser.onboarding_done,
        baby_birth_date: checkUser.baby_birth_date
    };

    res.status(UserSignInToAccountRegisteredSuccessfully.status)
        .json(UserSignInToAccountRegisteredSuccessfully.output);
});

app.post('/api/users/auth/refresh-token', async (req, res) => {
    if (!checkRequiredFieldsForRefreshToken(req, res)) return;
    let checkUser = await checkUserExistByToken(req, res);
    if (checkUser === null) return;

    // Generate JWT Token
    var token = jwtGenerateToken({ email: req.body.email });
    // Preparing output

    await UserModel.update(
        { token: token },
        { where: { email: checkUser.email, id: checkUser.id, token: checkUser.token } })
        .then(() => {
            TokenUpdatedSuccessfully.output.result = {
                token: token
            };

            res.status(TokenUpdatedSuccessfully.status)
                .json(TokenUpdatedSuccessfully.output);
        }).catch((err) => {
            TokenUpdatingFailed.output.result = {
                error: err
            }
            res.status(TokenUpdatingFailed.status)
                .json(TokenUpdatingFailed.output);
        });

});

app.listen(port, () => {
    return console.log(`Keleya server is listening on ${port}`);
});
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import * as Api from './api';

function* fetchNotes() {
    try {
        const notes = yield call(Api.fetchNotes);
        yield put({ type: actions.NOTES_SUCCESS, notes });
    } catch (e) {
        yield put({ type: actions.NOTES_FAILURE, message: e.message });
    }
}

function* saga() {
    yield takeEvery(actions.NOTES_REQUEST, fetchNotes);
}

export default saga;

import jsonRequest from '@/utils/jsonRequest';

export function getAllQuestionaire() {
    return jsonRequest.get('questionaire')
}

export function getAllQuestionaireStatus() {
    return jsonRequest.get('questionairestatus')
}

export function getAllQuestionType() {
    return jsonRequest.get('questiontype')
}
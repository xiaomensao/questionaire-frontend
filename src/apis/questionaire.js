import jsonRequest from '@/utils/jsonRequest';

export function getAllQuestionaire() {
    return jsonRequest.get('questionaire');
}

export function getAllQuestionaireStatus() {
    return jsonRequest.get('questionairestatus');
}

export function getAllQuestionType() {
    return jsonRequest.get('questiontype');
}

export function saveQuestionaire(questionaire) {
    return jsonRequest.post('questionaireSave/', questionaire);
}

export function getQuestionaire(id) {
    return jsonRequest.get('questionaire/' + id);
}

export function getQuestions(id) {
    return jsonRequest.get('question/?questionaireId=' + id);
}

export function submitResponse(response) {
    return jsonRequest.post('responseSubmit/', response);
}

export function getResponses(id) {
    return jsonRequest.get('response/?questionaireId=' + id);
}

export function updateQuestionaire(id, item) {
    return jsonRequest.put('questionaire/' + id + '/', item);
}
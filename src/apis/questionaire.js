import jsonRequest from '@/utils/jsonRequest';

export function getAllQuestionaire() {
    return jsonRequest.get('questionaire')
}
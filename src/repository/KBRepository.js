import * as JsonUtils from '../service/JsonUtils'

class Question {
    id = 0;
    description = "";
    linkAnswers = [new Answer(), new Answer()];

    constructor(id, description, linkAnswers) {
        this.id = id;
        this.description = description;
        this.linkAnswers = linkAnswers;
    }
}

class Answer {
    description = "";
    linkQuestionId = 0;
    linkProductId = 0;

    constructor(description, linkQuestionId, linkProductId) {
        this.description = description;
        this.linkQuestionId = linkQuestionId;
        this.linkProductId = linkProductId;
    }
}

const questions = () => {
    return JsonUtils.getDateJson("questions.json");
};



export {questions};
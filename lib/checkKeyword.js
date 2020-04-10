"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKeyword = (keywords, content) => {
    return keywords.some(keyword => {
        if (content.title.toLowerCase().includes(keyword.toLowerCase())) {
            return true;
        }
    });
};

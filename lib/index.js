"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const getIssueContent_1 = require("./getIssueContent");
const checkKeyword_1 = require("./checkKeyword");
const setIssueLabel_1 = require("./setIssueLabel");
const setIssueAssignee_1 = require("./setIssueAssignee");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keyword = core.getInput("keywords");
            const keywords = keyword.split(" ");
            console.log(`keywords: ${keywords}`);
            const action = core.getInput("action");
            const actionArgs = action.split(" ");
            console.log(`action: ${action.split(" ")}`);
            const token = core.getInput("github-token");
            const content = yield getIssueContent_1.getIssueContent(token);
            const hasKeyword = checkKeyword_1.checkKeyword(keywords, content);
            if (!hasKeyword) {
                console.log("Keyword not included in this issue");
                return;
            }
            switch (actionArgs[0]) {
                case "label":
                    setIssueLabel_1.setIssueLabel(token, actionArgs.slice(1));
                    break;
                case "assign":
                    setIssueAssignee_1.setIssueAssignee(token, actionArgs.slice(1));
                    break;
                default:
                    core.setFailed(`Invalid action: ${actionArgs[0]}`);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();

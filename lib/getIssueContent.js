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
const github = __importStar(require("@actions/github"));
const github_1 = require("./github");
exports.getIssueContent = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const octokit = new github.GitHub(token);
    const issue_number = github_1.getIssueNumber();
    if (issue_number == null) {
        throw new Error("No Issue Provided");
    }
    const { data } = yield octokit.issues.get(Object.assign(Object.assign({}, github_1.getRepo()), { issue_number }));
    const { title, body } = data;
    return { title, body };
});

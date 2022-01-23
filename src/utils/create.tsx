import { IssueTypeLabel } from '../interface';

function createComment(type: string) {
  const comment = '<!-- generated by issue-helper DO NOT REMOVE -->';
  return comment.replace('-->', IssueTypeLabel[type] + ' -->');
}

function creatIssue(isBugRef, formDataRef) {
  return isBugRef.value
    ? `### ${formDataRef.value.repo} version (版本)
${formDataRef.value.versionRepository}

### Vue version (Vue 版本)
${formDataRef.value.versionVue}

### Browser and its version (浏览器及其版本)
${formDataRef.value.versionBrowser}

### System and its version (系统及其版本)
${formDataRef.value.versionSystem}

### Node version (Node 版本)
${formDataRef.value.versionNode}

### Reappearance link (重现链接)
${formDataRef.value.reproduce}

### Reappearance steps (重现步骤)
${formDataRef.value.steps}

### Expected results (期望的结果)
${formDataRef.value.expected}

### Actual results (实际的结果)
${formDataRef.value.actual}

### Remarks (补充说明)
${formDataRef.value.remarks}
`.trim()
    : `### This function solves the problem (这个功能解决的问题)
${formDataRef.value.functionContent}
### Expected API (期望的 API)
${formDataRef.value.functionalExpectations}`.trim();
}

export function create(isBugRef, formDataRef) {
  const issueString = `${createComment(formDataRef.value.type)}\n\n${creatIssue(
    isBugRef,
    formDataRef
  )}\n\n${createComment(formDataRef.value.type)}`;
  const issueUriComponent = encodeURIComponent(issueString).replace(
    /%2B/gi,
    '+'
  );
  window.open(
    `https://github.com/${formDataRef.value.repo}/issues/new?title=${formDataRef.value.title}&body=${issueUriComponent}`
  );
}

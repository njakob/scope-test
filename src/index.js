// @flow

type OptionsType = {
  requiredScopes?: string[];
  ignoreCase?: boolean;
};

export class UngrantedScopeError extends Error {
  missingScopes: string[];

  constructor(missingScopes: string[]) {
    super('Some scopes are not granted');
    this.name = UngrantedScopeError.name;
    const error = new Error(this.message);
    error.name = this.name;
    this.stack = error.stack;
    this.missingScopes = missingScopes;
  }
}

function buildTable(scopes: string[], ignoreCase: boolean): { [key: string]: string; } {
  const table = {};
  for (let i = scopes.length - 1; i >= 0; i -= 1) {
    const scope = scopes[i];
    table[(ignoreCase ? scope.toLowerCase() : scope)] = scope;
  }
  return table;
}

export default function (scopes: string[], options: OptionsType = {}) {
  const ignoreCase = !!options.ignoreCase;
  const requiredScopesTable = buildTable(options.requiredScopes || [], ignoreCase);
  const requiredScopes = Object.keys(requiredScopesTable);
  const grantedScopesTable = buildTable(scopes, ignoreCase);
  const grantedScopes = Object.keys(grantedScopesTable);
  const missingScopes = [];

  for (let i = requiredScopes.length - 1; i >= 0; i -= 1) {
    const requiredScope = requiredScopes[i];
    let granted = false;
    for (let j = grantedScopes.length - 1; j >= 0; j -= 1) {
      if (grantedScopes[j] === requiredScope) {
        granted = true;
        break;
      }
    }
    if (!granted) {
      missingScopes.push(requiredScopesTable[requiredScope]);
    }
  }
  if (missingScopes.length) {
    throw new UngrantedScopeError(missingScopes);
  }
}

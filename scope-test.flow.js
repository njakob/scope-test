// @flow

type scopeTest$Options = {
  requiredScopes?: string[];
  ignoreCase?: boolean;
};

declare class UngrantedScopeError extends Error {
  missingScopes: string[];
}

declare module 'scope-test' {
  declare var exports: {
    (scopes: string[], options?: scopeTest$Options): void;
    UngrantedScopeError: Class<UngrantedScopeError>;
  };
}
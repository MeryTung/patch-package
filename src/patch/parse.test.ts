import { parsePatchFile } from "../patch/parse"
const crlfLineBreaks = `diff --git a/banana.ts b/banana.ts
new file mode 100644
index 0000000..3e1267f
--- /dev/null
+++ b/banana.ts
@@ -0,0 +1 @@
+this is a new file
`.replace(/\n/g, "\r\n")

const modeChangeAndModifyAndRename = `diff --git a/numbers.txt b/banana.txt
old mode 100644
new mode 100755
similarity index 96%
rename from numbers.txt
rename to banana.txt
index fbf1785..92d2c5f
--- a/numbers.txt
+++ b/banana.txt
@@ -1,4 +1,4 @@
-one
+ne
 
 two
 
`

const oldStylePatch = `patch-package
--- a/node_modules/graphql/utilities/assertValidName.js
+++ b/node_modules/graphql/utilities/assertValidName.js
@@ -41,10 +41,11 @@ function assertValidName(name) {
  */
 function isValidNameError(name, node) {
   !(typeof name === 'string') ? (0, _invariant2.default)(0, 'Expected string') : void 0;
-  if (name.length > 1 && name[0] === '_' && name[1] === '_') {
-    return new _GraphQLError.GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
-  }
+  // if (name.length > 1 && name[0] === '_' && name[1] === '_') {
+  //   return new _GraphQLError.GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
+  // }
   if (!NAME_RX.test(name)) {
     return new _GraphQLError.GraphQLError('Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "' + name + '" does not.', node);
   }
+
 }
\\ No newline at end of file
--- a/node_modules/graphql/utilities/assertValidName.mjs
+++ b/node_modules/graphql/utilities/assertValidName.mjs
@@ -29,9 +29,9 @@ export function assertValidName(name) {
  */
 export function isValidNameError(name, node) {
   !(typeof name === 'string') ? invariant(0, 'Expected string') : void 0;
-  if (name.length > 1 && name[0] === '_' && name[1] === '_') {
-    return new GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
-  }
+  // if (name.length > 1 && name[0] === '_' && name[1] === '_') {
+  //   return new GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
+  // }
   if (!NAME_RX.test(name)) {
     return new GraphQLError('Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "' + name + '" does not.', node);
   }
`

    expect(parsePatchFile(patch)).toMatchSnapshot()
    expect(() => parsePatchFile(invalidHeaders1)).toThrow()
    expect(() => parsePatchFile(invalidHeaders2)).toThrow()
    expect(() => parsePatchFile(invalidHeaders3)).toThrow()
    expect(() => parsePatchFile(invalidHeaders4)).toThrow()
    expect(() => parsePatchFile(invalidHeaders5)).toThrow()
    expect(parsePatchFile(accidentalBlankLine)).toEqual(parsePatchFile(patch))
  })
  it(`can handle files with CRLF line breaks`, () => {
    expect(parsePatchFile(crlfLineBreaks)).toMatchSnapshot()
  })

  it("works", () => {
    expect(parsePatchFile(modeChangeAndModifyAndRename)).toMatchSnapshot()

    expect(parsePatchFile(accidentalBlankLine)).toMatchSnapshot()
    expect(parsePatchFile(modeChangeAndModifyAndRename)).toMatchSnapshot()
  })

  it.only("parses old-style patches", () => {
    expect(parsePatchFile(oldStylePatch)).toMatchSnapshot()
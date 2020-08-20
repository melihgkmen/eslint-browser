/*
 * STOP!!! DO NOT MODIFY.
 *
 * This file is part of the ongoing work to move the eslintrc-style config
 * system into the @eslint/eslintrc package. This file needs to remain
 * unchanged in order for this work to proceed.
 *
 * If you think you need to change this file, please contact @nzakas first.
 *
 * Thanks in advance for your cooperation.
 */

/**
 * @fileoverview Tests for naming util
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("chai").assert,
    naming = require("../../../lib/shared/naming");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("naming", () => {
    describe("normalizePackageName()", () => {

        [
            ["foo", "eslint-config-foo"],
            ["eslint-config-foo", "eslint-config-foo"],
            ["@z/foo", "@z/eslint-config-foo"],
            ["@z\\foo", "@z/eslint-config-foo"],
            ["@z\\foo\\bar.js", "@z/eslint-config-foo/bar.js"],
            ["@z/eslint-config", "@z/eslint-config"],
            ["@z/eslint-config-foo", "@z/eslint-config-foo"]
        ].forEach(([input, expected]) => {
            it(`should return ${expected} when passed ${input}`, () => {
                const result = naming.normalizePackageName(input, "eslint-config");

                assert.strictEqual(result, expected);
            });
        });

    });

    describe("getShorthandName()", () => {

        [
            ["foo", "foo"],
            ["eslint-config-foo", "foo"],
            ["@z", "@z"],
            ["@z/eslint-config", "@z"],
            ["@z/foo", "@z/foo"],
            ["@z/eslint-config-foo", "@z/foo"]
        ].forEach(([input, expected]) => {
            it(`should return ${expected} when passed ${input}`, () => {
                const result = naming.getShorthandName(input, "eslint-config");

                assert.strictEqual(result, expected);
            });
        });

    });

    describe("getNamespaceFromTerm()", () => {
        it("should remove namespace when passed with namespace", () => {
            const namespace = naming.getNamespaceFromTerm("@namespace/eslint-plugin-test");

            assert.strictEqual(namespace, "@namespace/");
        });
    });
});
